using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class VaccinationInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ApproveFirstVaccination",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ApproveFourthVaccination",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ApproveSecondVaccination",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ApproveThirdVaccination",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "FirstVaccination",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "FourthVaccination",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "SecondVaccination",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ThirdVaccination",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApproveFirstVaccination",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "ApproveFourthVaccination",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "ApproveSecondVaccination",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "ApproveThirdVaccination",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "FirstVaccination",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "FourthVaccination",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "SecondVaccination",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "ThirdVaccination",
                table: "ChildrenInformation");
        }
    }
}
