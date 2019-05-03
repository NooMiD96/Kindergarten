using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class ChildrenInformationRemoveDefaultValueToHealthGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "HealthGroupId",
                table: "ChildrenInformation",
                oldDefaultValue: 2,
                defaultValue: null
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
