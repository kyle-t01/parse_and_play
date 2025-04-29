# Parse and Play: Play music from text!
**Parse and Play** is an app built with AWS cloud (S3, Lambda Functions, DynamoDB) that converts musical notation into audio playback. The cloud infrastructure is provisioned and maintained using Terraform (Infrastructure as Code), and deployed automatically via a GitHub Actions CI/CD pipeline.

**Try it yourself here!**: [Parse and Play: Play music from text!](http://parse-and-play-2.s3-website-ap-southeast-2.amazonaws.com)

## Purpose
- learn about AWS cloud deployment (S3, Lambda, DynamoDB)
- explore Infrastructure as Code (IaC) with Terraform
- set up a CI/CD pipeline using GitHub Actions (automate deployment)
- practice Bash scripting for automating repetitive tasks
- make it easy to convert text to music (it is supposed to be a fun project after all)

## Core Features
- user can input notes and durations like D-F#-A:1/4 (see "Input Formatting")
- user can upload files containing notes
- data preview shows whether each note was parsed or invalid (with the help of regex)
- user can play music using a web audio synth (Tone.js)
- users can submit feedback and, bug reports saved via **Lambda Function** + **DynamoDB**

## Technologies Used
- **React.js** => frontend
- **AWS S3** => hosts the static frontend
- **AWS Lambda** => receives user reports and writes them to DynamoDB
- **AWS DynamoDB** => database that stores user reports (reports auto-delete after 7 days)
- **Terraform** => provision/manage Infrastructure as Code (IaC), without needing manual setup on aws
- **GitHub Actions** => CI/CD pipeline (builds app and deploys to aws cloud)
- **tone.js package** => web audio synth player
- **Bash Scripting** => automate Terraform execution, and inject environment variables

## What does my workflow look like?
1. run ./terraform_apply.sh (**bashscript**)
    - runs **Terraform** to apply Infrastructure as Code (IaC)
    - injects important variables in environment files
      - updates app URL in the `README.md`
      - updates app URL in the `cicd.yml` file
      - set database name in **Lambda Function** environment
      - sets backend API endpoint for frontend app
2. commit and push code changes to GitHub (triggers **GitHub Actions**)
3. **GitHub Actions** (as defined in `.github/workflows/cicd.yml`) will:
    - provision a fresh Ubuntu VM
    - installs frontend dependencies
    - build the frontend app
    - upload and deploy the built app to our **S3** bucket
    - website is now (automatically) live at the **S3** website URL: [Parse and Play: Play music from text!](http://parse-and-play-2.s3-website-ap-southeast-2.amazonaws.com)


## How to use:
### Input Formatting
| Feature                                      | Example                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| Single Notes                                 | C, D, E, F, G, A, B                                                      |
| Accidentals                                  | C`#` or C`b`                                                             |
| Octave                                       | C#`1`, C#`2`, ... C#`7` (defaults to 4 when omitted, range 0–7)          |
| Play a group of notes together (note1-note2) | Use "`-`" to chain notes together: D`-`F#`-`A                            |
| Duration (:number)                           | C`:1/4`, C`:0.25` (C`:1/4` = quarter note, defaults to 1/4 when omitted) |
| Play Nothing (.)                             | `.` or `.`:1/4 etc                                                       |


### Features to be Implemented
- Chords: `maj`, `min`, `dim`, `aug` (for example: `Cmaj`)
- 7th Chords: `maj7`, `min7`, `dim7`, `dom7` (for example: `Cmin7`)
- Complex chord example: `C4maj-B4:1/2`

### Examples
| Name                                         | Notes                                                                                                                                                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4-5-3-6 Japanese Rock Progression            | C4-E4-G4:0.5 C3:0.5 D4-F#4-A4:0.5 D3:0.5 B3-D4-F#4:0.5 B2:0.5 E4-G4-B4:0.5 E3:0.5 A3-C4-E4:0.5 A2:0.5 B3-D4-F#4:0.25 B2:0.25 D#3-D#4-F#4-B4:0.5 E3:0.25 E4:0.25 G4:0.25 B4:0.25 D3:0.25 D4:0.25 F#4:0.25 A4:0.25 |
| Music with some invalid OR unsupported input | Cb4maj7:1/2 .: . C5 C7 .:1/2 D-F#-A .-F#-.:1/4 :                                                                                                                                                                 |

## Screenshots
### Inputting Text and Playing
<img src="./images/inputbox.png" alt="text-input" width="100%">

### Submitting a Report
<img src="./images/report.png" alt="reporting" width="100%">

### Reports stored in DynamoDB Database
<img src="./images/dynamoDB.png" alt="database" width="100%">

## Possible Extensions
- Ability to download .midi or .mp3 files parsed from the input
- Playback ability (ie: pause, ability to jump to any note)
- Deployment on AWS Lightsail when more features are added (but for now, stay in free tier)
- More music tracks (ie: play more than one track at the same time)

## Addendum: 
### Regex Pattern:
- notes: Cb, A#, ., Bb7 etc => noteRegex = "(?:[A-G][b#]?[0-9]?|[.])";
- chained notes: D-F#-A etc => chainedNoteRegex = `((?:${noteRegex}-)*${noteRegex})`
- durations: :1/4, :0.25 etc => durationRegex = "(?:[:]([0-9]+\/[1-9]+|(?:[0-9]*[.])?[0-9]+))?"
- all together => `^${chainedNoteRegex}${durationRegex}`$

