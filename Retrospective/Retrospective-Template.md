# TEMPLATE FOR RETROSPECTIVE (Team 08)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done
- Total points committed vs. done
- Nr of hours planned vs. spent (as a team)

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Integration Tests
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 7       |        | 8          | 13,25        |
| _#1_  | 7       | 1      | 7,667      | 6,75         |
| _#2_  | 7       | 2      | 7,167      | 7,333        |
| _#3_  | 6       | 2      | 7,167      | 5,583        |
| _#4_  | 6       | 5      | 17,5       | 17,333       |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

|                        | estimate | actual |
| ---------------------- | -------- | ------ |
| Hours per task average | 1,394    | 1,523  |
| Standard deviation     | 1,200    | 1,330  |

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 = _-0,085_

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 6
  - Total hours spent: 6,334
  - Nr of automated unit test cases: 34
  - Coverage (if available): 100%
- Integration testing:
  - Total hours estimated: 4,5
  - Total hours spent: 5,834
- E22 testing:
  - Total hours estimated: 1
  - Total hours spent: 1
- Code review
  - Total hours estimated
  - Total hours spent
    > _In our case the code review is included within both test parts, so it cannot be estimated/traced_

## ASSESSMENT

- What caused your errors in estimation (if any)?\
  The main mistake was not defining and deciding exactly what each task included, especially for the front-end part.

- What lessons did you learn (both positive and negative) in this sprint?\
  Not defining what operations a task include can harm its execution, forgetting something important to do or doing something that yous shouldn't do.
  Despite the task splitting was not carried out correctly, the team still managed to finish all the stories defined, without exceeding their       personal workload too much.

- Which improvement goals set in the previous retrospective were you able to achieve?\
  This is our first retrospective. 
- Which ones you were not able to achieve? Why?\
  This is our first retrospective, again.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)\
  Better task splitting: for each task defining all the required operations that it will include 
  Improve branching: define common rules for executing commits and branches on the current work, decide a folder structure to follow 
  Improve estimations: define better estimations for testing tasks and front-end tasks  
  Keep tracking of current work on YouTrack: adding spent time at the end of the working day
  Improve DB definition

> Propose one or two

- One thing you are proud of as a Team!!\
  The team has a good cooridnation, everybody works as espected and reacts promptly to communications
