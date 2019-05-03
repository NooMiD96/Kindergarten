using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class TableCreateHealthGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HealthGroup",
                columns: table => new
                {
                    HealthGroupId = table.Column<int>(nullable: false),
                    Number = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthGroup", x => x.HealthGroupId);
                });

            migrationBuilder.InsertData(
                table: "HealthGroup",
                columns: new[] { "HealthGroupId", "Description", "Number" },
                values: new object[,]
                {
                    { 1, "Группа здоровья I", 1 },
                    { 2, "Группа здоровья II", 2 },
                    { 3, "Группа здоровья III", 3 },
                    { 4, "Группа здоровья IV", 4 },
                    { 5, "Группа здоровья V", 5 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HealthGroup");
        }
    }
}
