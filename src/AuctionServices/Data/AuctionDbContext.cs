using AuctionServices.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionServices.Data;

public class AuctionDbContext : DbContext
{
    public AuctionDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Auction> Auctions { get; set; }
}