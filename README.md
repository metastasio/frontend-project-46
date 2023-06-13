### Hexlet tests and linter status:
[![Actions Status](https://github.com/metastasio/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/metastasio/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/8e52ed442f639f8f1736/maintainability)](https://codeclimate.com/github/metastasio/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8e52ed442f639f8f1736/test_coverage)](https://codeclimate.com/github/metastasio/frontend-project-46/test_coverage)

## Description
### This programm determines the difference between two data structures. 
<br>

**Utility features:**

- Supports yaml and json input formats
- Report can be generated in the form of a plain text, json output or stylish format

<br>

**Installation** 
<br>
To be able to run this program you need to have **Node.JS** installed.
```
git clone https://github.com/metastasio/frontend-project-44.git

cd frontend-project-44

make install

npm link
``` 
<br>

**Usage example:**
<br>
You can choose the output format by using the flag **--format (-f)** with either **plain**, **json** or **stylish**. <br>
Default output format is 'stylish':
```
gendiff path/to/file1 path/to/file2
```
[![asciicast](https://asciinema.org/a/ADuQicl5F0uwd12CpK3p9yDdb.svg)](https://asciinema.org/a/ADuQicl5F0uwd12CpK3p9yDdb)
<br>

Plain output: <br>
```
gendiff -f plain path/to/file1 path/to/file2
```
[![asciicast](https://asciinema.org/a/cmvPxD1DPjbTdoTIr2aBcBtkz.svg)](https://asciinema.org/a/cmvPxD1DPjbTdoTIr2aBcBtkz)
<br>
Plain output: <br>
```
gendiff -f json path/to/file1 path/to/file2
```
[![asciicast](https://asciinema.org/a/xTaRfXiL8dPQmyF5JSQVn87Zb.svg)](https://asciinema.org/a/xTaRfXiL8dPQmyF5JSQVn87Zb)