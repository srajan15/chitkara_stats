# Example Dataset

| X (Study Hours) | Y (Marks) |
| --------------- | --------- |
| 2               | 40        |
| 4               | 50        |
| 6               | 60        |
| 8               | 70        |

---

# Step 1: Find Mean

$$
\bar{X} = (2+4+6+8)/4 = 5
$$

$$
\bar{Y} = (40+50+60+70)/4 = 55
$$

---

# Step 2: Make Table

| X       | Y   | X − X̄ | Y − Ȳ | (X − X̄)(Y − Ȳ) | (X − X̄)² | (Y − Ȳ)² |
| ------- | --- | ----- | ----- | -------------- | -------- | -------- |
| 2       | 40  | -3    | -15   | 45             | 9        | 225      |
| 4       | 50  | -1    | -5    | 5              | 1        | 25       |
| 6       | 60  | 1     | 5     | 5              | 1        | 25       |
| 8       | 70  | 3     | 15    | 45             | 9        | 225      |
| **Sum** |     |       |       | **100**        | **20**   | **500**  |

---

# Step 3: Put Values in Formula

$$
r = \frac{\sum (X - \bar{X})(Y - \bar{Y})}{\sqrt{\sum (X - \bar{X})^2 \times \sum (Y - \bar{Y})^2}}
$$

$$
r = \frac{100}{\sqrt{20 \times 500}}
$$

$$
r = \frac{100}{\sqrt{10000}}
$$

$$
r = \frac{100}{100}
$$

$$
r = 1
$$

---

# Final Answer

**Correlation (r) = +1 → Perfect Positive Correlation**

Meaning:

> More study hours → Marks increase perfectly.

---

# Shortcut Table Method (Exam Trick)

| Column         | Formula               |
| -------------- | --------------------- |
| X − X̄          | X − mean of X         |
| Y − Ȳ          | Y − mean of Y         |
| Multiply       | (X − X̄)(Y − Ȳ)        |
| Square         | (X − X̄)² and (Y − Ȳ)² |
| Sum            | Add all columns       |
| Put in formula | Final answer          |

---

# Interpretation

| r Value | Meaning          |
| ------- | ---------------- |
| +1      | Perfect positive |
| +0.8    | Strong           |
| +0.5    | Moderate         |
| +0.2    | Weak             |
| 0       | No relation      |
| -0.5    | Negative         |
| -1      | Perfect negative |

---

# One-Line Memory Trick

> Correlation =
> **(Multiply differences sum) / √(Square sum × Square sum)**
