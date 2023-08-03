Đây là project cơ bản 

Link structure project: https://miro.com/app/board/uXjVPkIC7D8=/


Command migration data
```
dotnet ef migrations add AddColumTypeStaff --context WebContext --project Admin.Domain
dotnet ef database update ChangeWebContext --project Admin.Domain --connection "Server=DESKTOP-ULBTB7P; Database=BaseProject;User Id=sa;Password=Admin@123; MultipleActiveResultSets=true;TrustServerCertificate=True;"
```