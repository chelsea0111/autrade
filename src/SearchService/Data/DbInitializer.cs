using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        // use MongoDB.Entities
        await DB.InitAsync("SearchDb",
            MongoClientSettings.FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnectionString")));
// before creating the index, make sure the Item collection is created
        await DB.Index<Item>()
            .Key(x => x.Make, KeyType.Text)
            .Key(x => x.Model, KeyType.Text)
            .Key(x => x.Color, KeyType.Text)
            .CreateAsync();

        // var count = await DB.CountAsync<Item>();
        // if (count == 0)
        // {
        //     Console.WriteLine("No data - will attempt to seed");
        //     var itemData = await File.ReadAllTextAsync("Data/auctions.json");
        //     var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        //     List<Item> items = JsonSerializer.Deserialize<List<Item>>(itemData, options);
        //     await DB.SaveAsync(items);
        // }

        // get data from Auction Service
        using var scope = app.Services.CreateScope();
        AuctionSvcHttpClient httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();
        List<Item> items = await httpClient.GetItemsForSearchDb();
        Console.WriteLine($"Got {items.Count} items from Auction Service");
        if (items.Count > 0)
        {
            await DB.SaveAsync(items);
        }
    }
}