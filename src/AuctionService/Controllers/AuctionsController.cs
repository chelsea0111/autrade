using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController : ControllerBase
{
    private readonly AuctionDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _context = context;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuction(string date)
    {
        IQueryable<Auction> query = _context.Auctions.OrderBy(x => x.Item.Make).AsQueryable();
        if (!string.IsNullOrEmpty(date))
        {
            query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }

        // Auction[] auctions = await _context.Auctions
        //     .Include(x => x.Item)
        //     .OrderBy(x => x.Item.Make)
        //     .ToArrayAsync();
        // return _mapper.Map<List<AuctionDto>>(auctions);

        // map auctions in db to auctionDtos directly. Rather than new AuctionDto({...})
        // It will filter column in db later.
        // ToListAsync() execute the query and return a list of AuctionDto
        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        Auction auction = await _context.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(a => a.Id == id);
        if (auction == null) return NotFound();
        return _mapper.Map<AuctionDto>(auction);
    }

    [HttpPost]
    public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto auctionDto)
    {
        Auction auction = _mapper.Map<Auction>(auctionDto);
        // TODO: add current user as seller
        auction.Seller = "test";

        _context.Add(auction);
        // publish AuctionCreated event
        var newAuction = _mapper.Map<AuctionDto>(auction);
        await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));

        bool result = await _context.SaveChangesAsync() > 0;

        if (!result)
        {
            // 400
            return BadRequest("Could not save changes to the DB");
        }

        // 201
        return CreatedAtAction(nameof(GetAuctionById), new { id = auction.Id }, newAuction);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
    {
        Auction auction = await _context.Auctions.Include(x => x.Item).FirstOrDefaultAsync(x => x.Id == id);
        if (auction == null) return NotFound();
        // TODO: check seller is current user
        auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
        auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
        auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;
        auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
        auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
        // context has tracking auctions and items,
        // so if there is a change, ef core will mark them as "modified",
        // and then generate sql statements to save these changes;

        await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

        bool result = await _context.SaveChangesAsync() > 0;
        if (!result)
        {
            return BadRequest("Problem saving changes");
        }

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        Auction auction = await _context.Auctions.FindAsync(id);
        if (auction == null) return NotFound();
        // TODO: check seller is current user
        _context.Auctions.Remove(auction);
        
        await _publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });
        
        var result = await _context.SaveChangesAsync() > 0;
        if (!result)
        {
            return BadRequest("Problem deleting auction");
        }

        return Ok();
    }
}