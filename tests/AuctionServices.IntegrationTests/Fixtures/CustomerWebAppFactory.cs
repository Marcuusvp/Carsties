using AuctionServices.Data;
using AuctionServices.IntegrationTests.Util;
using MassTransit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;

namespace AuctionServices.IntegrationTests.Fixtures;

public class CustomerWebAppFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    private PostgreSqlContainer _postgreSqlContainer = new PostgreSqlBuilder().Build();
    public async Task InitializeAsync()
    {
        await _postgreSqlContainer.StartAsync();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureTestServices(services =>
        {   // Configurando projeto para remover o uso do banco e usar o container de teste
            services.RemoveDbContext<AuctionDbContext>();
            
            services.AddDbContext<AuctionDbContext>(options =>
            {
                options.UseNpgsql(_postgreSqlContainer.GetConnectionString());
            });
            
            // Configurando o MassTransit para usar o teste de massa
            services.AddMassTransitTestHarness();
            
            // Criando o banco de dados de teste
            services.EnsureCreated<AuctionDbContext>();
        });
    }
    Task IAsyncLifetime.DisposeAsync() => _postgreSqlContainer.DisposeAsync().AsTask();
}


