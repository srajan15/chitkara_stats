## p-value and Significance Level (α)

This is the **heart of hypothesis testing**

---

## 1. What is p-value? (Simple Meaning)

> **p-value = Probability that the result happened by chance assuming H₀ is true**

In simple words:

> **p-value tells us whether the result is real or just luck/random chance.**

---

### Example (Easy)

Suppose:

- H₀: New teaching method does NOT improve marks
- You collect data and see improvement

Now question:

> Is this improvement real or just by chance?

**p-value answers this question.**

| p-value | Meaning              |
| ------- | -------------------- |
| 0.50    | Result is random     |
| 0.20    | Maybe random         |
| 0.04    | Not random           |
| 0.01    | Strong evidence      |
| 0.001   | Very strong evidence |

So:

> **Smaller p-value = Strong evidence against H₀**

---

## 2. What is Significance Level (α)?

> **Significance level (α) is a threshold value that we choose to decide whether to reject H₀ or not.**

Usually:

> **α = 0.05 (most commonly used)**

This means:

> We are okay with **5% risk** of making a wrong decision.

---

## 3. Relationship Between p-value and α

| Condition | Decision          |
| --------- | ----------------- |
| p ≤ α     | Reject H₀         |
| p > α     | Fail to Reject H₀ |

Most common:

```id="4t6d9q"
If p-value < 0.05 → Reject H₀
If p-value ≥ 0.05 → Fail to Reject H₀
```

---

## 4. Why α = 0.05?

Because it means:

> We accept **5% chance of rejecting a true H₀** (Type I Error).

| α value | Meaning  |
| ------- | -------- |
| 0.10    | 10% risk |
| 0.05    | 5% risk  |
| 0.01    | 1% risk  |

Smaller α → More strict test.

---

## 5. Visual Idea

Imagine a line:

```
0 -------------------- 0.05 -------------------- 1
        Reject H₀              Fail to Reject H₀
```

If p-value falls in left side → Reject H₀

---

## 6. Real Example

| Step    | Value |
| ------- | ----- |
| α       | 0.05  |
| p-value | 0.03  |

Since:

> 0.03 < 0.05 → Reject H₀ → New method works

Another case:

| Step    | Value |
| ------- | ----- |
| α       | 0.05  |
| p-value | 0.20  |

Since:

> 0.20 > 0.05 → Fail to Reject H₀ → No proof new method works

---

## 7. Final Summary Table

| Term    | Meaning                             |
| ------- | ----------------------------------- |
| p-value | Probability result is due to chance |
| α       | Cutoff value                        |
| p < α   | Reject H₀                           |
| p ≥ α   | Fail to Reject H₀                   |

---

## 8. One-Line Summary (Very Important)

> **p-value tells evidence, α is the decision boundary.**

Or:

> **If p-value is small → Reject H₀**
> **If p-value is large → Fail to Reject H₀**

---

## 9. Memory Trick

| Word     | Meaning          |
| -------- | ---------------- |
| p-value  | Proof            |
| α        | Rule             |
| Decision | Compare p with α |

```
If p < α → Reject H₀
If p ≥ α → Keep H₀
```

---
