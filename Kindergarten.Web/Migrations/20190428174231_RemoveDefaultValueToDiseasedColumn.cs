using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class RemoveDefaultValueToDiseasedColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Diseased",
                table: "Visitation",
                oldDefaultValue: false,
                defaultValue: null
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
