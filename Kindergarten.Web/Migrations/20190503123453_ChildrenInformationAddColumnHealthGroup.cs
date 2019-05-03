using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class ChildrenInformationAddColumnHealthGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HealthGroupId",
                table: "ChildrenInformation",
                nullable: false,
                defaultValue: 2);

            migrationBuilder.AddColumn<string>(
                name: "Info",
                table: "ChildrenInformation",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChildrenInformation_HealthGroupId",
                table: "ChildrenInformation",
                column: "HealthGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChildrenInformation_HealthGroup_HealthGroupId",
                table: "ChildrenInformation",
                column: "HealthGroupId",
                principalTable: "HealthGroup",
                principalColumn: "HealthGroupId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChildrenInformation_HealthGroup_HealthGroupId",
                table: "ChildrenInformation");

            migrationBuilder.DropIndex(
                name: "IX_ChildrenInformation_HealthGroupId",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "HealthGroupId",
                table: "ChildrenInformation");

            migrationBuilder.DropColumn(
                name: "Info",
                table: "ChildrenInformation");
        }
    }
}
