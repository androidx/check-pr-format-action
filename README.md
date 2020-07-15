# Check Pull Request Format Action

A GitHub action that ensures that pull requests follow conventions.

## Usage

Use a snippet like this to setup the Webhook step in your `YAML` file.

```yaml
- name: 'Validate Pull Request'
  uses: 'tikurahul/check-pr-format-action@master'
  with:
    # Enforces a `Test: <stanza>` in the pull request
    # This regular expressions are evaluated for every line in the pull request body.
    checks: '["(.*)?Test\:(.*)?"]'
```
