using CV.Api.Models.Entity;
using QuestPDF.Drawing;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class CvDocument : IDocument
{
    public CV.Api.Models.Entity.Document Document { get; }

    public string Font { get; }
    public float FontSize { get; }

    public float PrimaryHeaderSize { get; }
    public float SecondaryHeaderSize { get; }

    public string PrimaryHeaderColor { get; }

    public CvDocument(
        CV.Api.Models.Entity.Document document
        // string font,
        // float fontSize,
        // float primaryHeaderSize,
        // float secondaryHeaderSize,
        // string primaryHeaderColor
        )
    {
        Document = document;
        Font = "Arial";
        FontSize = 11;
        PrimaryHeaderSize = 16;
        SecondaryHeaderSize = 14;
        PrimaryHeaderColor = "#002060";
        // Font = font;
        // FontSize = fontSize;
        // PrimaryHeaderSize = primaryHeaderSize;
        // SecondaryHeaderSize = secondaryHeaderSize;
        // PrimaryHeaderColor = primaryHeaderColor;
    }

    public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            page.Size(PageSizes.A4);
            page.MarginHorizontal((float)2.5, Unit.Centimetre);
            page.MarginVertical((float)1.25, Unit.Centimetre);
            page.PageColor(Colors.White);
            page.DefaultTextStyle(x => x.FontSize(FontSize).FontFamily(Font).LineHeight((float)1.24));

            page.Header().AlignRight().Element(ComposeHeader);

            page.Content().Element(ComposeContent);

            page.Footer().AlignLeft().Text("www.dizparc.se").FontSize(8);
        });
    }

    void ComposeHeader(IContainer container)
    {
        container.Row(row =>
        {
            row.ConstantItem(85).Height(30).Placeholder();
            // row.ConstantItem(85).Image("", ImageScaling.FitArea);
            // row.ConstantItem(85).Image(imageData, ImageScaling.FitArea);
        });
    }

    void ComposeContent(IContainer container)
    {
        container
        .PaddingVertical((float)0.2, Unit.Centimetre)
        .Column(col =>
        {
            // col.Spacing(45);

            col.Item().DefaultTextStyle(x => x.FontSize(12).FontColor(PrimaryHeaderColor)).Row(row =>
            {
                row.RelativeItem()
                    .Text("Curriculum Vitae");
                row.RelativeItem()
                    .AlignRight().Text("dizparc.se");
            });

            col.Item().PaddingBottom(45);

            // Profile page
            col.Item().Row(row =>
            {
                row.Spacing(20);
                // profile
                row.RelativeItem().Column(col =>
                {
                    col.Item().Component(new HeaderComponent($"{Document.FirstName} {Document.LastName}", PrimaryHeaderSize, PrimaryHeaderColor, paddingBottom: 2));

                    col.Item().Component(new HeaderComponent("Beskrivning", SecondaryHeaderSize, PrimaryHeaderColor, 6));
                    col.Item().Text(Document.Description);

                    col.Item().PaddingVertical(30);

                    col.Item().Component(new HeaderComponent("Personliga egenskaper", SecondaryHeaderSize, PrimaryHeaderColor, 6));
                    col.Item().Text(Document.Characteristics);
                });

                // Sidebar with avatar, title, lang...
                row.ConstantItem(4, Unit.Centimetre)
                .DefaultTextStyle(x => x.FontSize((float)9.5))
                .Column(col =>
                {
                    // col.Item().Image(imageData, ImageScaling.FitArea); // avatar
                    col.Item().Height(140).Placeholder();

                    col.Item().PaddingVertical(6);
                    col.Item().Text("Titel").Italic();
                    col.Item().Text(Document.Profession);
                    col.Item().Text("Avdelning").Italic();
                    col.Item().Text("dizparc Halmstad"); // document property instead?
                    col.Item().Text("Språk").Italic();
                    col.Item().Text(Document.Languages);
                });
            });

            col.Item().PaddingBottom(120);

            col.Item().Component(new HeaderComponent("Arbetslivserfarenhet", PrimaryHeaderSize, PrimaryHeaderColor, paddingBottom: 2));
            col.Item().Row(row => row.RelativeItem().Column(col =>
            {
                col.Spacing(8);
                if (Document.Work != null && Document.Work?.Count() > 0)
                    foreach (var work in Document.Work)
                        if (work.Visible)
                            col.Item().Component(new WorkComponent(work));

            }));

            col.Item().PageBreak();

            col.Item().Component(new HeaderComponent("Utvalda Projekt", PrimaryHeaderSize, PrimaryHeaderColor, paddingBottom: 2));
            col.Item().Row(row => row.RelativeItem().Column(col =>
            {
                col.Spacing(8);
                if (Document.Projects != null && Document.Projects?.Count() > 0)
                    foreach (var project in Document.Projects)
                        if (project.Visible)
                            col.Item().PaddingHorizontal(5).Component(new ProjectComponent(project));
            }));

            col.Item().PageBreak();

            col.Item().Component(new HeaderComponent("Utbildning", PrimaryHeaderSize, PrimaryHeaderColor, paddingBottom: 2));
            col.Item().Row(row => row.RelativeItem().Column(col =>
            {
                col.Spacing(8);
                if (Document.Educations != null && Document.Educations?.Count() > 0)
                    foreach (var education in Document.Educations)
                        if (education.Visible)
                            col.Item().Component(new EducationComponent(education));
            }));

            col.Item().Component(new HeaderComponent("Programvaruteknik", PrimaryHeaderSize, PrimaryHeaderColor, 16, 2));
            col.Item().Row(row => row.RelativeItem().Column(col =>
            {
                col.Spacing(8);
                if (Document.Skills != null && Document.Skills?.Count() > 0)
                    foreach (var skill in Document.Skills)
                        if (skill.Visible)
                            col.Item().Component(new SkillComponent(skill));
            }));

        });
    }
}

public class HeaderComponent : IComponent
{
    public string Header { get; }
    public float FontSize { get; }
    public string Color { get; }
    public float PaddingTop { get; }
    public float PaddingBottom { get; }

    public HeaderComponent(string header, float fontSize, string color, float paddingTop = 0, float paddingBottom = 0)
    {
        Header = header;
        FontSize = fontSize;
        Color = color;
        PaddingTop = paddingTop;
        PaddingBottom = paddingBottom;
    }

    public void Compose(IContainer container)
    {
        container.PaddingTop(PaddingTop).PaddingBottom(PaddingBottom)
            .Text(Header).FontSize(FontSize).FontColor(Color).Bold();
    }
}

public class WorkComponent : IComponent
{
    public CV.Api.Models.Entity.Work Work { get; }

    public WorkComponent(Work work)
    {
        Work = work;
    }

    public void Compose(IContainer container)
    {
        container.Column(col => col.Item().Row(row =>
        {
            row.ConstantItem(90).PaddingTop(1).Text($"{Work.StartDate?.Year.ToString()}-{Work.EndDate?.Year.ToString()}").Italic();
            row.RelativeItem().Text($"{Work.Employer}, {Work.Profession}").FontSize(12);
        }));
    }
}

public class ProjectComponent : IComponent
{
    public CV.Api.Models.Entity.Project Project { get; }

    public ProjectComponent(Project project)
    {
        Project = project;
    }

    public void Compose(IContainer container)
    {
        container.Column(col =>
        {
            var colSize = 85;
            col.Item().Row(row =>
            {
                row.ConstantItem(colSize).Text(Project.CustomerName).Bold();
                row.RelativeItem().Text(Project.Title).Bold();
            });
            col.Item().Row(row =>
            {
                row.ConstantItem(colSize).Text("Uppdrag").Italic();
                row.RelativeItem().Text(Project.Assignment);
            });
            col.Item().Row(row =>
            {
                row.ConstantItem(colSize).Text("Roll").Italic();
                row.RelativeItem().Text(Project.Role);
            });
            col.Item().Row(row =>
            {
                row.ConstantItem(colSize).Text("Kundnytta").Italic();
                row.RelativeItem().Text(Project.Description);
            });
            col.Item().Row(row =>
            {
                row.ConstantItem(colSize).Text("Metod/teknik").Italic();
                row.RelativeItem().Text(Project.Tech);
            });
            col.Item().Row(row =>
            {
                row.ConstantItem(colSize).Text("Period").Italic();
                row.RelativeItem().Text($"{Project.StartDate?.Year.ToString()}-{Project.EndDate?.Year.ToString()}");
            });

            col.Item().BorderBottom((float)0.5).PaddingBottom(5);
        });
    }
}

public class EducationComponent : IComponent
{
    public CV.Api.Models.Entity.Education Education { get; }

    public EducationComponent(Education education)
    {
        Education = education;
    }

    public void Compose(IContainer container)
    {
        container.Column(col =>
        {
            col.Item().Text(Education.School).Bold();
            col.Item().Text(Education.Degree);
            col.Item().Text($"{Education.StartDate?.Year.ToString()}-{Education.EndDate?.Year.ToString()}");
        });
    }
}

public class SkillComponent : IComponent
{
    public CV.Api.Models.Entity.Skill Skill { get; }

    public SkillComponent(Skill skill)
    {
        Skill = skill;
    }

    public void Compose(IContainer container)
    {
        container.Column(col =>
        {
            col.Item().Text(Skill.Type).Bold();
            col.Item().Text(Skill.Text);
        });
    }
}
