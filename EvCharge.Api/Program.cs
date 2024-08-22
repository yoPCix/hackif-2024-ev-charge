using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System.Text.RegularExpressions;
using EvCharge.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(opts =>
    opts.Conventions.Add(new RouteTokenTransformerConvention(new ToKebabParameterTransformer())));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<PlacesRepository>();

var app = builder.Build();

app.UseCors(policy =>
{
    //if (app.Environment.IsDevelopment())
    //{
    policy.AllowAnyHeader();
    policy.WithOrigins("http://localhost:5173");
    //}
});

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

public class ToKebabParameterTransformer : IOutboundParameterTransformer
{
    public string TransformOutbound(object? value) => value != null
        ? Regex.Replace(value.ToString(), "([a-z])([A-Z])", "$1-$2").ToLower() // to kebab 
        : null;
}