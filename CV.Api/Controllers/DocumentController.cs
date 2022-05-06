using CV.Api.Models.DTO;
using CV.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using static CV.Api.Models.DTO.GetDocumentResponse;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace CV.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DocumentController : ControllerBase
{
    private readonly IRepositoryManager repository;

    public DocumentController(IRepositoryManager repository)
    {
        this.repository = repository;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var document = repository.Document.GetById(id);

        if (document == null)
            return NotFound();

        var response = new GetDocumentResponse
        {
            Id = document.Id,
            Name = document.Name,
            FirstName = document.FirstName,
            LastName = document.LastName,
            Profession = document.Profession,
            Description = document.Description,
            Characteristics = document.Characteristics,
            Languages = document.Languages,
        };

        if (document.Work != null)
            response.Work = document.Work
            .Select(w => new WorkResponse
            {
                Id = w.Id,
                Profession = w.Profession,
                Employer = w.Employer,
                StartDate = w.StartDate,
                EndDate = w.EndDate,
                Visible = w.Visible,
                Position = w.Position
            }).OrderBy(w => w.Position);

        if (document.Projects != null)
            response.Projects = document.Projects
            .Select(p => new ProjectResponse
            {
                Id = p.Id,
                CustomerName = p.CustomerName,
                Title = p.Title,
                Assignment = p.Assignment,
                Role = p.Role,
                Description = p.Description,
                Tech = p.Tech,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                Visible = p.Visible,
                Position = p.Position
            }).OrderBy(p => p.Position);

        if (document.Educations != null)
            response.Educations = document.Educations
            .Select(e => new EducationResponse
            {
                Id = e.Id,
                School = e.School,
                Degree = e.Degree,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                Visible = e.Visible,
                Position = e.Position
            }).OrderBy(e => e.Position);

        if (document.Skills != null)
            response.Skills = document.Skills
            .Select(s => new SkillResponse
            {
                Id = s.Id,
                Type = s.Type,
                Text = s.Text,
                Visible = s.Visible,
                Position = s.Position
            }).OrderBy(s => s.Position);

        return Ok(response);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var documents = repository.Document.GetAll();

        if (documents == null)
            return NotFound();

        var response = documents.Select(d => new GetDocumentsResponse
        {
            Id = d.Id,
            Name = d.Name
        });

        return Ok(response);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateDocumentRequest createDocumentRequest)
    {
        var document = new Models.Entity.Document
        {
            Name = createDocumentRequest.Name,
            FirstName = createDocumentRequest.FirstName,
            LastName = createDocumentRequest.LastName,
            Profession = createDocumentRequest.Profession,
            Description = createDocumentRequest.Description,
            Characteristics = createDocumentRequest.Characteristics,
            Languages = createDocumentRequest.Languages,
            Work = createDocumentRequest.Work.Select(w => new Models.Entity.Work
            {
                Profession = w.Profession,
                Employer = w.Employer,
                StartDate = w.StartDate.ToString() == "" ? null : w.StartDate,
                EndDate = w.EndDate.ToString() == "" ? null : w.EndDate,
                Visible = w.Visible,
                Position = w.Position
            }).ToList(),
            Projects = createDocumentRequest.Projects.Select(p => new Models.Entity.Project
            {
                CustomerName = p.CustomerName,
                Title = p.Title,
                Assignment = p.Assignment,
                Role = p.Role,
                Description = p.Description,
                Tech = p.Tech,
                StartDate = p.StartDate.ToString() == "" ? null : p.StartDate,
                EndDate = p.EndDate.ToString() == "" ? null : p.EndDate,
                Visible = p.Visible,
                Position = p.Position
            }).ToList(),
            Educations = createDocumentRequest.Educations.Select(e => new Models.Entity.Education
            {
                School = e.School,
                Degree = e.Degree,
                StartDate = e.StartDate.ToString() == "" ? null : e.StartDate,
                EndDate = e.EndDate.ToString() == "" ? null : e.EndDate,
                Visible = e.Visible,
                Position = e.Position
            }).ToList(),
            Skills = createDocumentRequest.Skills.Select(s => new Models.Entity.Skill
            {
                Type = s.Type,
                Text = s.Text,
                Visible = s.Visible,
                Position = s.Position
            }).ToList()
        };

        var result = repository.Document.Create(document);
        repository.Save();
        return Ok(result.Id);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] UpdateDocumentRequest updateDocumentRequest)
    {
        var document = repository.Document.GetById(id);

        if (document == null)
            return NotFound();

        document.Name = updateDocumentRequest.Name;
        document.FirstName = updateDocumentRequest.FirstName;
        document.LastName = updateDocumentRequest.LastName;
        document.Profession = updateDocumentRequest.Profession;
        document.Description = updateDocumentRequest.Description;
        document.Characteristics = updateDocumentRequest.Characteristics;
        document.Languages = updateDocumentRequest.Languages;

        document.Work = updateDocumentRequest.Work.Select(w => new Models.Entity.Work
        {
            Id = (int)w.Id,
            Profession = w.Profession,
            Employer = w.Employer,
            StartDate = w.StartDate.ToString() == "" ? null : w.StartDate,
            EndDate = w.EndDate.ToString() == "" ? null : w.EndDate,
            Visible = w.Visible,
            Position = w.Position
        }).ToList();

        document.Projects = updateDocumentRequest.Projects.Select(p => new Models.Entity.Project
        {
            Id = (int)p.Id,
            CustomerName = p.CustomerName,
            Title = p.Title,
            Assignment = p.Assignment,
            Role = p.Role,
            Tech = p.Tech,
            Description = p.Description,
            StartDate = p.StartDate.ToString() == "" ? null : p.StartDate,
            EndDate = p.EndDate.ToString() == "" ? null : p.EndDate,
            Visible = p.Visible,
            Position = p.Position
        }).ToList();

        document.Educations = updateDocumentRequest.Educations.Select(e => new Models.Entity.Education
        {
            Id = (int)e.Id,
            School = e.School,
            Degree = e.Degree,
            StartDate = e.StartDate.ToString() == "" ? null : e.StartDate,
            EndDate = e.EndDate.ToString() == "" ? null : e.EndDate,
            Visible = e.Visible,
            Position = e.Position
        }).ToList();

        document.Skills = updateDocumentRequest.Skills.Select(s => new Models.Entity.Skill
        {
            Id = (int)s.Id,
            Type = s.Type,
            Text = s.Text,
            Visible = s.Visible,
            Position = s.Position
        }).ToList();

        var result = repository.Document.Update(document);
        repository.Save();
        return Ok(result.Id);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var document = repository.Document.GetById(id);

        if (document == null)
            return NotFound();

        repository.Document.Delete(document);
        repository.Save();
        return Ok();
    }

    [HttpGet("{id}/download")]
    public IActionResult Download(int id)
    {
        var document = repository.Document.GetById(id);

        if (document == null)
            return NotFound();

        var stream = new MemoryStream();
        var font = "sans-serif";

        // pdf template isn't done
        Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(11).FontFamily(font));

                page.Header().AlignRight().Row(row =>
                {
                    row.ConstantItem(100).Height(50).Placeholder();
                });

                page.Content()
                    .PaddingVertical(1, Unit.Centimetre)
                    .Column(col =>
                    {
                        col.Item().Text("Curriculum Vitae").FontSize(12).FontColor(Colors.Blue.Darken4);

                        col.Spacing(20);

                        col.Item().Text(document.FirstName + " " + document.LastName);

                        col.Item().Text(document.Description);
                        col.Item().Text(document.Characteristics);
                    });

                page.Footer()
                    .AlignLeft()
                    .Text("www.dizparc.se").FontSize(8);
            });
        })
       .GeneratePdf(stream);

        stream.Position = 0;

        return File(stream, "application/pdf", "document.pdf");
    }
}
