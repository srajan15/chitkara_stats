**Example:** `12/1/2010 8:26:00 AM`

Assume this value is in **E2 (InvoiceDate)**.

---

# Step-by-Step: Separate Date and Time

## Step 1 – Insert Two New Columns

- Insert a new column and name it **Date**
- Insert another column and name it **Time**

So now:

- Column E = InvoiceDate
- Column F = Date
- Column G = Time

---

## Step 2 – Extract Date

In **F2** write:

```excel
=INT(E2)
```

Press Enter.

---

## Step 3 – Extract Time

In **G2** write:

```excel
=E2-INT(E2)
```

Press Enter.

---

## Step 4 – Drag Formula

- Select F2 and G2
- Double click the small square at bottom-right → Apply to all rows

---

## Step 5 – Format Date Column

1. Select Column F
2. Press **Ctrl + 1**
3. Click **Date**
4. Choose format → `14-03-2012` or `14-Mar-2012`
5. Click OK

---

## Step 6 – Format Time Column

1. Select Column G
2. Press **Ctrl + 1**
3. Click **Time**
4. Choose **1:30 PM**
5. Click OK

---

## Final Result

| InvoiceDate       | Date      | Time    |
| ----------------- | --------- | ------- |
| 12/1/2010 8:26 AM | 12/1/2010 | 8:26 AM |

---

## Important Interview Concept

**Excel stores Date as number and Time as decimal.**

| Date      | Time    | Excel Value |
| --------- | ------- | ----------- |
| 12/1/2010 | 8:26 AM | 40513.351   |

So:

- `INT(E2)` → Date
- `E2 - INT(E2)` → Time

---

## Shortcut Method (Very Fast)

You can also use:

| For Date         | For Time         |
| ---------------- | ---------------- |
| `=DATEVALUE(E2)` | `=TIMEVALUE(E2)` |

---

If you want, next I will give you **Date & Time Excel Tasks** for your Invoice dataset (very important for interviews + real job work).
