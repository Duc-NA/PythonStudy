using Admin.Application.Interfaces;
using Admin.Application.Services;
using Admin.Repository.Interfaces;
using Admin.Repository.Repositorys;
using Microsoft.AspNetCore.Identity;
//using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();

// configure DI for application services
builder.Services.AddScoped<IUserServices, UserServices>();

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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
