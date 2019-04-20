using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class TryChangeFKChildren1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Children_ChildrenInformation_ChildrenId",
                table: "Children");

            migrationBuilder.AddForeignKey(
                name: "FK_ChildrenInformation_Children_ChildrenId",
                table: "ChildrenInformation",
                column: "ChildrenId",
                principalTable: "Children",
                principalColumn: "ChildrenId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChildrenInformation_Children_ChildrenId",
                table: "ChildrenInformation");

            migrationBuilder.AddForeignKey(
                name: "FK_Children_ChildrenInformation_ChildrenId",
                table: "Children",
                column: "ChildrenId",
                principalTable: "ChildrenInformation",
                principalColumn: "ChildrenId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
