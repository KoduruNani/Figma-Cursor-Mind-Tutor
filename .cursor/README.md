# 🤖 Cursor AI Code Review Automation

This directory contains the configuration for automated code review using Cursor AI, providing intelligent PR analysis, reviewer suggestions, and code quality checks for your full-stack .NET Core + React TypeScript project.

## 📁 Structure

```
.cursor/
├── config.yaml                    # Main configuration file
├── rules/                         # Code quality rules
│   ├── code-quality-csharp.yaml   # C# specific rules
│   ├── code-quality-typescript.yaml # TypeScript/React rules
│   └── architecture-guidelines.yaml # Architecture patterns
├── prompts/                       # Custom AI prompts
│   ├── summarize-pr.txt          # PR summarization prompt
│   └── reviewer-hint.txt         # Reviewer suggestion prompt
└── README.md                     # This file
```

## 🚀 Features

### ✅ **PR Summarization**
- Automatic analysis of changes and impact assessment
- Technical breakdown of backend/frontend modifications
- Risk assessment and deployment considerations

### ✅ **Reviewer Suggestions**
- Intelligent reviewer assignment based on file ownership
- Expertise matching for different change types
- Workload balancing across team members

### ✅ **Code Quality Analysis**
- **C# Rules**: Console logging, async patterns, DI usage
- **TypeScript Rules**: Type safety, React best practices, API patterns
- **Architecture Rules**: Service layer, state management, security

### ✅ **Pre-review Checks**
- Static analysis before human review
- Security scanning for sensitive data
- Performance and maintainability checks

### ✅ **PR Comments**
- Automated feedback on code quality issues
- Actionable suggestions for improvements
- Review checklist and recommendations

## ⚙️ Configuration

### Main Config (`config.yaml`)
```yaml
ci:
  enabled: true
  pr_summarization: true
  reviewer_suggestion: true
  code_analysis: true
  pre_review_checks: true
  post_comment_on_pr: true
```

### Language-Specific Rules
- **C#**: Dependency injection, async patterns, logging
- **TypeScript**: Type safety, React hooks, service layer
- **Architecture**: Cross-cutting concerns, patterns, security

## 🎯 How It Works

### 1. **PR Creation**
When a PR is created or updated, Cursor AI automatically:

1. **Analyzes Changes**: Scans modified files for patterns and violations
2. **Generates Summary**: Creates comprehensive PR summary with impact assessment
3. **Suggests Reviewers**: Based on CODEOWNERS and file ownership
4. **Runs Quality Checks**: Applies language-specific rules
5. **Posts Comments**: Provides actionable feedback

### 2. **Review Process**
- **Required Reviewers**: Automatically assigned based on file ownership
- **Quality Gates**: Code must pass automated checks
- **Human Review**: Focus on business logic and architecture decisions

### 3. **Fallback System**
If Cursor AI is unavailable, GitHub Actions workflow provides:
- Basic code analysis
- Security scanning
- Quality checks
- PR summarization

## 📋 Rule Categories

### C# Code Quality
- ✅ No `Console.WriteLine` in production
- ✅ Avoid `async void` methods
- ✅ Use Dependency Injection for services
- ✅ Proper exception handling
- ✅ LINQ best practices

### TypeScript/React Quality
- ✅ No `any` types
- ✅ No `console.log()` in production
- ✅ API calls via services only
- ✅ Functional components only
- ✅ Proper state management

### Architecture Guidelines
- ✅ API logic in service layer
- ✅ Centralized state management
- ✅ Proper error handling
- ✅ Security best practices
- ✅ Performance considerations

## 👥 Reviewer Assignment

### Backend Changes (`server/`)
- **@backend-lead**: Primary backend reviewer
- **@api-expert**: API design and contracts
- **@data-expert**: Database and data layer
- **@security-expert**: Authentication and security

### Frontend Changes (`client/`)
- **@frontend-lead**: Primary frontend reviewer
- **@ui-expert**: UI/UX and components
- **@state-expert**: State management
- **@performance-expert**: Performance optimization

### Configuration Changes
- **@devops-lead**: Infrastructure and deployment
- **@architect**: Architecture and patterns
- **@ci-expert**: CI/CD and automation

## 🔧 Customization

### Adding New Rules
1. Edit the appropriate rule file in `.cursor/rules/`
2. Add pattern matching and severity levels
3. Test with sample code

### Modifying Prompts
1. Edit prompt files in `.cursor/prompts/`
2. Customize for your team's review style
3. Add domain-specific considerations

### Updating CODEOWNERS
1. Edit `.github/CODEOWNERS`
2. Add new team members and expertise areas
3. Update file ownership patterns

## 🚨 Troubleshooting

### Cursor AI Not Working
1. Check `.cursor/config.yaml` syntax
2. Verify rule file paths
3. Check Cursor IDE integration
4. Use GitHub Actions fallback

### Rules Not Triggering
1. Verify file patterns in rules
2. Check severity levels
3. Review exclude patterns
4. Test with sample violations

### Reviewer Assignment Issues
1. Check CODEOWNERS syntax
2. Verify GitHub usernames
3. Review file ownership patterns
4. Test with sample PRs

## 📊 Metrics and Monitoring

### Review Quality
- Automated check pass rate
- Human review time
- Code quality improvements
- Bug reduction

### Team Efficiency
- Review turnaround time
- Reviewer workload distribution
- Knowledge sharing effectiveness
- Onboarding speed

## 🔄 Continuous Improvement

### Regular Reviews
- Monthly rule effectiveness review
- Quarterly prompt optimization
- Annual architecture guideline updates
- Continuous feedback collection

### Team Feedback
- Review process satisfaction
- Rule accuracy and relevance
- Prompt clarity and usefulness
- Automation effectiveness

## 📚 Resources

- [Cursor AI Documentation](https://cursor.sh/docs)
- [GitHub CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub Actions](https://docs.github.com/en/actions)
- [C# Best Practices](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/)
- [React Best Practices](https://react.dev/learn)

---

**Maintained by**: @devops-lead @architect  
**Last Updated**: July 2025  
**Version**: 1.0.0 