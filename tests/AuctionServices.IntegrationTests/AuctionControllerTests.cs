using System.Net;
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
    private const string GT_ID = "afbee524-5972-4075-8800-7d1f9d7b0a0c";
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

    [Fact]
    public async Task GetAuctionById_WithValidId_ShouldReturnAuction()
    {
        // Arrange
        
        // Act
        var response = await _httpClient.GetFromJsonAsync<AuctionDto>($"api/auctions/{GT_ID}");
        
        // Assert
        Assert.Equal("GT", response.Model);
    }
    
    [Fact]
    public async Task GetAuctionById_WithInvalidId_ShouldReturnNotFound()
    {
        // Arrange
        // Act
        var response = await _httpClient.GetAsync($"api/auctions/{Guid.NewGuid()}");
        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
    
    [Fact]
    public async Task GetAuctionById_WithInvalidGuid_ShouldReturnBadRequest()
    {
        // Arrange
        // Act
        var response = await _httpClient.GetAsync($"api/auctions/notAGuid");
        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
    
    [Fact]
    public async Task GetAuctionById_WithNoAuth_ShouldReturn401()
    {
        // Arrange
        var auction = new CreateAuctionDto { Make = "test" };
        // Act
        var response = await _httpClient.PostAsJsonAsync("api/auctions", auction);
        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
    
    [Fact]
    public async Task GetAuctionById_WithAuth_ShouldReturn201()
    {
        // Arrange
        var auction = GetAuctionForCreate();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));
        // Act
        var response = await _httpClient.PostAsJsonAsync("api/auctions", auction);
        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var createdAuction = await response.Content.ReadFromJsonAsync<AuctionDto>();
        Assert.Equal("bob", createdAuction.Seller);
    }
    
    [Fact]
    public async Task CreateAuction_WithInvalidCreateAuctionDto_ShouldReturn400()
    {
        // arrange

        // act

        // assert
    }

    [Fact]
    public async Task UpdateAuction_WithValidUpdateDtoAndUser_ShouldReturn200()
    {
        // arrange

        // act

        // assert
    }

    [Fact]
    public async Task UpdateAuction_WithValidUpdateDtoAndInvalidUser_ShouldReturn403()
    {
        // arrange 

        // act

        // assert
    }
    
    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync()
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();
        
        DbHelper.ReinitDbForTests(db);
        return Task.CompletedTask;
    }

    private CreateAuctionDto GetAuctionForCreate()
    {
        return new CreateAuctionDto
        {
            Make = "test",
            Model = "testModel",
            ImageUrl = "test",
            Color = "test",
            Mileage = 10,
            Year = 10,
            ReservePrice = 10
        };
    }

}