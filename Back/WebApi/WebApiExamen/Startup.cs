using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;
using WebAPI.Domain.SICOMA.Mapping;
using WebApiDomain.Helper;
using WebApiDomain.Services;
using WebApiRepository.Context;

namespace WebApiExamen
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
            services.AddCors(options =>
            {
                var origins = Configuration.GetSection("Cors:Origins").Get<string[]>();
                options.AddPolicy("CorsPolicy-public",
                    builder =>
                        builder
                        .WithOrigins(origins)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        );

            });
            services.AddDbContext<AppDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ConnectionString")));
            services.AddTransient(typeof(ProductService), typeof(ProductService));
            services.AddTransient(typeof(BrandService), typeof(BrandService));
            Mapper.Reset();
            Mapper.Initialize((config) => { config.AddProfile<MappingProfile>(); });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSwaggerGen(x =>
           {
               x.SwaggerDoc("v1", new Info { Title = "WebApi Examen", Version = "v1"});
           });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy-public");  //apply to every request

            var swaggerOptions = new WebApiDomain.Helper.SwaggerOptions();
            Configuration.GetSection(nameof(swaggerOptions)).Bind(swaggerOptions);
            app.UseSwagger(option =>
            {
                option.RouteTemplate = swaggerOptions.JsonRoute;
                option.RouteTemplate.DefaultIfEmpty();
            });
            app.UseSwaggerUI(option =>
            {
                option.SwaggerEndpoint(swaggerOptions.UIEndpoint, swaggerOptions.Description);

            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
