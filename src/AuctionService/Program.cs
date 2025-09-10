using AuctionService.Consumers;
using AuctionService.Data;
using MassTransit;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// AddMassTransit() to register the MassTransit services
builder.Services.AddMassTransit(x =>
{
    x.AddEntityFrameworkOutbox<AuctionDbContext>(o =>
    {
        // check the outbox every 10 seconds
        o.QueryDelay = TimeSpan.FromSeconds(10);
        o.UsePostgres();
        o.UseBusOutbox();
    });
    x.AddConsumersFromNamespaceContaining<AuctionCreatedFaultConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("auction",false));
    x.UsingRabbitMq((context, cfg) => { cfg.ConfigureEndpoints(context); });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseAuthorization();
app.MapControllers();

// Initialize the database - seed data
try
{
    DbInitializer.InitDb(app);
}
catch (Exception e)
{
    Console.WriteLine(e);
    throw;
}


app.Run();