# Spearman Correlation (Step-by-Step)

---

## When Spearman is Used

Use Spearman when:

- Data is in **rank**
- Data has **outliers**
- Relationship is **not linear**
- You want **rank comparison**

---

## Formula (Spearman)

$$
\rho = 1 - \frac{6 \sum d^2}{n(n^2 - 1)}
$$

Where:

| Symbol | Meaning                  |
| ------ | ------------------------ |
| d      | Difference between ranks |
| n      | Number of observations   |
| ρ      | Spearman correlation     |

---

## Example

| Student | Math Marks | Science Marks |
| ------- | ---------- | ------------- |
| A       | 90         | 85            |
| B       | 80         | 70            |
| C       | 70         | 60            |
| D       | 60         | 75            |
| E       | 50         | 50            |

---

## Step 1: Convert Marks to Rank

| Student | Math | Rank (Math) | Science | Rank (Science) |
| ------- | ---- | ----------- | ------- | -------------- |
| A       | 90   | 1           | 85      | 1              |
| B       | 80   | 2           | 70      | 3              |
| C       | 70   | 3           | 60      | 4              |
| D       | 60   | 4           | 75      | 2              |
| E       | 50   | 5           | 50      | 5              |

> _(Rank 1 = Highest marks)_

---

## Step 2: Calculate d and d²

| Student | Rank M | Rank S | d = M − S | d²    |
| ------- | ------ | ------ | --------- | ----- |
| A       | 1      | 1      | 0         | 0     |
| B       | 2      | 3      | -1        | 1     |
| C       | 3      | 4      | -1        | 1     |
| D       | 4      | 2      | 2         | 4     |
| E       | 5      | 5      | 0         | 0     |
| **Sum** |        |        |           | **6** |

$$
\sum d^2 = 6 \qquad n = 5
$$

---

## Step 3: Put in Formula

$$
\rho = 1 - \frac{6 \times 6}{5(5^2 - 1)}
$$

$$
\rho = 1 - \frac{36}{5(25 - 1)}
$$

$$
\rho = 1 - \frac{36}{5 \times 24}
$$

$$
\rho = 1 - \frac{36}{120}
$$

$$
\rho = 1 - 0.3
$$

$$
\rho = 0.7
$$

---

## Final Answer

**Spearman Correlation = 0.7 → Strong Positive Relationship**

> Students who rank high in Math also rank high in Science.

---

## Pearson vs Spearman (Final Clear Difference)

| Pearson                 | Spearman                     |
| ----------------------- | ---------------------------- |
| Uses actual values      | Uses rank                    |
| Linear relationship     | Rank relationship            |
| Sensitive to outliers   | Not sensitive                |
| Formula uses mean & std | Formula uses rank difference |

---

## Quick Memory Trick

| Step | What to do               |
| ---- | ------------------------ |
| 1    | Convert data to rank     |
| 2    | Find d (rank difference) |
| 3    | Find d²                  |
| 4    | Sum d²                   |
| 5    | Put in formula           |
