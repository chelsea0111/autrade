using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services;

public class AuctionSvcHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _cfg;

    public AuctionSvcHttpClient(HttpClient httpClient, IConfiguration cfg)
    {
        _httpClient = httpClient;
        _cfg = cfg;
    }

    public async Task<List<Item>> GetItemsForSearchDb()
    {
        // Get the last updated date
        string lastUpdated = await DB.Find<Item, string>()
            .Sort(x => x.Descending(x => x.UpdatedAt))
            .Project(x => x.UpdatedAt.ToString())
            .ExecuteFirstAsync();
        return await _httpClient.GetFromJsonAsync<List<Item>>(_cfg["AuctionServiceUrl"] + "/api/auctions?date=" +
                                                              lastUpdated);
    }
}