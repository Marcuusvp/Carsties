using System.Net.Http.Json;
using AuctionServices.Data;
using AuctionServices.DTOs;
using AuctionServices.IntegrationTests.Fixtures;
using AuctionServices.IntegrationTests.Util;
using Microsoft.Extensions.DependencyInjection;

namespace AuctionServices.IntegrationTests;

public class AuctionControllerTests : IClassFixture<CustomerWebAppFactory>, IAsyncLifetime
{
    private readonly CustomerWebAppFactory _factory;
    private readonly HttpClient _httpClient;

    public AuctionControllerTests(CustomerWebAppFactory factory)
    {
        _factory = factory;
        _httpClient = _factory.CreateClient();
    }
    
    [Fact]
    public async Task GetAuctions_ShouldReturn3Auctions()
    {
        // Arrange
        // Act
        var response = await _httpClient.GetFromJsonAsync<List<AuctionDto>>("api/auctions");
        // Assert
        Assert.Equal(3, response.Count);
    }
    
    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync()
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();
        
        DbHelper.ReinitDbForTests(db);
        return Task.CompletedTask;
    }

}