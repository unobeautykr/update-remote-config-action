# Usage

```
- name: Update Remote Config
  uses: unobeautykr/update-remote-config-action@1.0.0
  with:
    gsaKey: {{ secrets.GSA_KEY }}
  env:
    key.param1: param1Value
    key.param2: param2Value
```
