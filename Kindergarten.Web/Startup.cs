using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System.Collections.Generic;
using System.IO;

using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Newtonsoft.Json.Serialization;

using static Database.DatabaseInitialization;

namespace Web
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
            SetupDatabaseSettings(services, Configuration);

            services.AddResponseCompression();

            services.AddAntiforgery(options =>
            {
                options.HeaderName = Configuration.GetValue<string>("XsrfName");
                //cookie is only for the same-site requests
                options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict;
                options.Cookie.Name = Configuration.GetValue<string>("XsrfName");
            });

            var serviceProvider = services.BuildServiceProvider();

            InitializeDb(serviceProvider, Configuration);

            services
                .AddMvc()
                //.AddNewtonsoftJson(jsonConfig =>
                //{
                //    jsonConfig.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                //    jsonConfig.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                //})
                .SetCompatibilityVersion(CompatibilityVersion.Latest);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = Configuration.GetValue<string>("SpaPhysicalStaticPath");
            });

            StartUpVendors.Configuration = Configuration;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        //IWebHostEnvironment
        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacementClientOptions = new Dictionary<string, string> { { "dynamicPublicPath", "false" } },
                    ProjectPath = Path.Combine(Directory.GetCurrentDirectory(), Configuration.GetValue<string>("SpaPhysicalRootPath")),
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }

            app.UseResponseCompression();

            app.UseSpaStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            //app.UseSpa(spaConfig =>
            //{
            //    spaConfig.Options.DefaultPage = new Microsoft.AspNetCore.Http.PathString("/");
            //    spaConfig.Options.SourcePath = Configuration.GetValue<string>("SpaPhysicalRootPath");
            //});
        }
    }
}
