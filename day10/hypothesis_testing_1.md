# Module 10 – Hypothesis Testing (Detailed Explanation)

---

## 1. What is Hypothesis Testing

- Hypothesis testing is a **statistical method used to make decisions** using data.
- We take a sample from population and test a claim.

**Simple Meaning:**
We check whether a statement is **true or false** using data.

**Example:**
A teacher says average marks of students $= 70$.
We collect sample data and test if it is really $70$ or not.

---

## 2. Null Hypothesis ($H_0$)

- Null hypothesis means **no change / no difference / statement is true**.
- It is the **default assumption**.

**Examples:**

- Average marks $= 70$
- New teaching method is not better
- Machine is working properly
- Medicine has no effect

So Null Hypothesis always contains:

- Equal $( = )$
- Greater or equal $( \geq )$
- Less or equal $( \leq )$

---

## 3. Alternative Hypothesis ($H_1$ or $H_a$)

- Alternative hypothesis means **there is change / there is difference**.
- Opposite of Null Hypothesis.

**Examples:**

- Average marks $\neq 70$
- New teaching method is better
- Machine is not working properly
- Medicine has effect

---

## 4. Types of Hypothesis Test

### (a) Two-Tailed Test

Used when we check **not equal**.

Example:

$$H_0: \mu = 70$$

$$H_1: \mu \neq 70$$

We check both sides (greater and less).

---

### (b) Left-Tailed Test

Used when we check **less than**.

Example:

$$H_1: \mu < 70$$

Example case:
Company claims bulb life $= 1000$ hours.
We test if bulb life is **less than 1000**.

---

### (c) Right-Tailed Test

Used when we check **greater than**.

Example:

$$H_1: \mu > 70$$

Example case:
New teaching method increases marks → test marks $> 70$.

---

## 5. Type I Error

- Rejecting $H_0$ when it is actually true.
- Called **False Positive**.

**Simple Example:**
A person is healthy but test says he is sick.

**Memory Trick:**
Type I → Reject True → False Alarm

---

## 6. Type II Error

- Accepting $H_0$ when it is actually false.
- Called **False Negative**.

**Simple Example:**
A person is sick but test says he is healthy.

**Memory Trick:**
Type II → Accept False → Missed Detection

---

## 7. Significance Level ($\alpha$)

- Significance level means **risk level**.
- Common value $= 0.05$ (5%)

**Meaning:**
We accept $5\%$ chance that our decision may be wrong.

| $\alpha$ Value | Meaning  |
| -------------- | -------- |
| $0.05$         | 5% risk  |
| $0.01$         | 1% risk  |
| $0.10$         | 10% risk |

---

## 8. P-Value

- P-value tells **how strong the evidence is against $H_0$**.

**Decision Rule:**

| $p$-value      | Decision        |
| -------------- | --------------- |
| $p \leq 0.05$  | Reject $H_0$    |
| $p > 0.05$     | Accept $H_0$    |

**Simple Meaning:**

- Small $p$-value → Strong evidence → Reject $H_0$
- Large $p$-value → Weak evidence → Accept $H_0$

---

## 9. Z-Test

Used when:

- Sample size $> 30$
- Population standard deviation **known**

Formula:

$$Z = \frac{\bar{X} - \mu}{\sigma / \sqrt{n}}$$

Where:

- $\bar{X}$ = Sample mean
- $\mu$ = Population mean
- $\sigma$ = Population standard deviation
- $n$ = Sample size

**Example:**

$$\mu = 50, \quad \bar{X} = 54, \quad \sigma = 10, \quad n = 36$$

$$Z = \frac{54 - 50}{10 / \sqrt{36}}$$

$$Z = \frac{4}{10/6}$$

$$Z = \frac{4}{1.67} = 2.39$$

Then we compare with Z-table.

---

## 10. T-Test

Used when:

- Sample size $< 30$
- Population standard deviation **not known**

Formula:

$$t = \frac{\bar{X} - \mu}{s / \sqrt{n}}$$

Where:

- $s$ = Sample standard deviation

**Example:**

$$\bar{X} = 60, \quad \mu = 55, \quad s = 8, \quad n = 16$$

$$t = \frac{60 - 55}{8 / \sqrt{16}}$$

$$t = \frac{5}{8/4}$$

$$t = \frac{5}{2} = 2.5$$

---

## 11. Chi-Square Test

- Used for **categorical data**.
- Used to compare **Observed vs Expected values**.

Formula:

$$\chi^2 = \sum \frac{(O - E)^2}{E}$$

Where:

- $O$ = Observed value
- $E$ = Expected value

**Example:**
Expected students $= 50$ boys, $50$ girls.
Observed $= 40$ boys, $60$ girls.

$$\chi^2 = \frac{(40-50)^2}{50} + \frac{(60-50)^2}{50}$$

$$= \frac{100}{50} + \frac{100}{50}$$

$$= 2 + 2 = 4$$

---

## 12. ANOVA (Analysis of Variance)

- Used to compare **means of 3 or more groups**.

**Example:**
Compare marks of:

- Class A
- Class B
- Class C

We test:

$$H_0: \mu_A = \mu_B = \mu_C$$

If ANOVA result is significant → Means are different.

---

## Final Summary Table

| Concept        | Meaning               |
| -------------- | --------------------- |
| Hypothesis     | Assumption            |
| $H_0$          | No change             |
| $H_1$          | There is change       |
| Type I Error   | Reject true $H_0$     |
| Type II Error  | Accept false $H_0$    |
| $\alpha$       | Significance level    |
| $p$-value      | Decision value        |
| Z-test         | Large sample          |
| T-test         | Small sample          |
| Chi-square     | Categorical data      |
| ANOVA          | Compare 3+ means      |
