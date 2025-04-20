using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class AuctionDbContext : DbContext
{
    public AuctionDbContext(DbContextOptions options) : base(options)
    {
    }

    // don't need to add DbSet for Item, because it's already related to Auction
    // add the [Table("Items")] annotation to the Item class
    public DbSet<Auction> Auctions { get; set; }
}