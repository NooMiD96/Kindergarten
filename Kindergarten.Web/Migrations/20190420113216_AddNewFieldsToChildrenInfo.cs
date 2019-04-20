using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddNewFieldsToChildrenInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FatherName",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber2",
                table: "ChildrenInformation",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "FatherName",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "PhoneNumber2",
                table: "ChildrenInformation");
        }
    }
}
