using Admin.Application.Helper;
using Admin.Application.Interfaces;
using Admin.Application.Services;
using Admin.Domain;
using Admin.Domain.Models;
using Admin.Repository.Interfaces;
using Admin.Repository.Models;
using Admin.Repository.Repositorys;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
//using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddDbContext<WebContext>();
builder.Services.AddIdentity<User, CustomRole>()
    .AddEntityFrameworkStores<WebContext>()
    .AddDefaultTokenProviders();
builder.Services.AddAutoMapper(typeof(Program));
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// configure DI for application services
builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<IJwtUtils, JwtUtils>();

// configure DI for repository
builder.Services.AddScoped<IUserRepository, UserRepository>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseMiddleware<JwtMiddleware>();
app.MapControllers();
app.UseHttpsRedirection();
app.UseAuthorization();
app.Run();
