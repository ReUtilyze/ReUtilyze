using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RecyclingForRewards.Web.API.Data;
using RecyclingForRewards.Web.API.Extensions;
using RecyclingForRewards.Web.API.Services;
using RecyclingForRewards.Web.API.Services.Interfaces;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CFCDatabaseSettings>(
              Configuration.GetSection(nameof(CFCDatabaseSettings)));

            services.AddSingleton<CFCDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<CFCDatabaseSettings>>().Value);

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<CurrentUserInfo, CurrentUserInfo>();
            // services.AddCors();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                     builder => builder.WithOrigins(Configuration["CorsOrigins"]
                     .Split(",", StringSplitOptions.RemoveEmptyEntries)
                     .ToArray()
                     )
                     .AllowAnyHeader()
                     .AllowAnyMethod()
                     .AllowCredentials()
                );
            });

            services.AddHttpContextAccessor();
            services.AddControllers()
               .AddNewtonsoftJson(options => options.UseMemberCasing());

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                  .AddJwtBearer(options =>
                  {
                      options.TokenValidationParameters = new TokenValidationParameters
                      {
                          ValidateIssuerSigningKey = true,
                          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWTAuth:TokenKey"])),
                          ValidateIssuer = false,
                          ValidateAudience = false,
                          RequireExpirationTime = false,
                          ValidateLifetime = true
                      };

                      options.Events = new JwtBearerEvents
                      {
                          OnMessageReceived = context =>
                          {
                              var accessToken = context.Request.Query["access_token"];

                              var path = context.HttpContext.Request.Path;
                              if (!string.IsNullOrEmpty(accessToken))
                              {
                                  context.Token = accessToken;
                              }

                              return Task.CompletedTask;
                          }
                      };

                  });
            services.AddSwaggerServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseAuthentication();
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();

            //}

            app.UseDeveloperExceptionPage();
            app.UseCors("CorsPolicy");
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("../swagger/v1/swagger.json", "RecyclingForRewards.Web.API v1"));

            app.UseHttpsRedirection();

            app.UseRouting();

       

            //app.UseCors(x => x
            //    .AllowAnyOrigin()
            //    .AllowAnyMethod()
            //    .AllowAnyHeader());

             app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
