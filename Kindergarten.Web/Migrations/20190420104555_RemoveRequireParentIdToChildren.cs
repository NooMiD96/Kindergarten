using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class RemoveRequireParentIdToChildren : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Children_ApplicationUser_ParentId",
                table: "Children");

            migrationBuilder.AlterColumn<string>(
                name: "ParentId",
                table: "Children",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_Children_ApplicationUser_ParentId",
                table: "Children",
                column: "ParentId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Children_ApplicationUser_ParentId",
                table: "Children");

            migrationBuilder.AlterColumn<string>(
                name: "ParentId",
                table: "Children",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Children_ApplicationUser_ParentId",
                table: "Children",
                column: "ParentId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
