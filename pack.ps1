$outputDir = "."
$build = "Release"
$version = "1.0.0"

msbuild .\Reingold.Episerver.SortableCheckboxListProperty.sln -t:Rebuild -p:Configuration=$build -p:Version=$version
.nuget\NuGet.exe pack .\SortableCheckboxListProperty\SortableCheckboxListProperty.csproj -IncludeReferencedProjects -properties Configuration=$build -Version $version -OutputDirectory $outputDir