FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
# 1. Cria a pasta de chaves:
RUN mkdir -p /app/keys
# 2. Ajusta permissões para o seu usuário não-root (por exemplo 1001:1001 ou $APP_UID:$APP_UID):
#    Se você sabe o UID numérico, use direto. Se for $APP_UID e for algo como "appuser",
#    pode precisar do --chown com COPY ou instalar chown no container. 
#    Para simplificar, pode liberar geral com chmod 777 (mas é menos seguro).
RUN chmod -R 777 /app/keys
# 3. Agora sim muda para seu usuário não-root
USER $APP_UID
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/IdentityService/IdentityService.csproj", "src/IdentityService/"]
RUN dotnet restore "src/IdentityService/IdentityService.csproj"
COPY . .
WORKDIR "/src/src/IdentityService"
RUN dotnet build "IdentityService.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "IdentityService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IdentityService.dll"]
