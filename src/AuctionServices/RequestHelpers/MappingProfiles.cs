using AuctionServices.DTOs;
using AuctionServices.Entities;
using AutoMapper;

namespace AuctionServices.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Item);
        CreateMap<Item, AuctionDto>();
        CreateMap<AuctionDto, Auction>()
            .ForMember(d => d.Item, opt => opt.MapFrom(s => s));
        CreateMap<CreateAuctionDto, Auction>()
            .ForMember(a => a.Item, opt => opt.MapFrom(s => s));
        CreateMap<CreateAuctionDto, Item>();
    }
}