# MilesWeb cPanel Database Setup

Follow these exact steps to create the Zahidaan database and run the schema:

1.  **Login to MilesWeb cPanel**: Access your cPanel using the credentials provided by MilesWeb.
2.  **Create the Database**:
    *   Find the **Databases** section and click on **MySQL® Databases**.
    *   Under **Create New Database**, enter `zahidaan_db` and click **Create Database**.
3.  **Create a Database User**:
    *   Scroll down to **MySQL Users -> Add New User**.
    *   Enter Username: `zahidaan_user`.
    *   Generate a strong password (copy it, you will need it for `api.php`).
    *   Click **Create User**.
4.  **Add User to Database**:
    *   Scroll down to **Add User To Database**.
    *   Select User: `zahidaan_user`.
    *   Select Database: `zahidaan_db`.
    *   Click **Add**.
    *   On the next screen, check **ALL PRIVILEGES** and click **Make Changes**.
5.  **Import Schema via phpMyAdmin**:
    *   Go back to the cPanel Home.
    *   Under **Databases**, click **phpMyAdmin**.
    *   Select `zahidaan_db` from the left sidebar.
    *   Click the **Import** tab at the top.
    *   Click **Choose File** and select the `schema.sql` file you created.
    *   Click **Go** at the bottom.
6.  **Run Seed Data (Optional for Testing)**:
    *   In phpMyAdmin, with `zahidaan_db` selected, click the **SQL** tab.
    *   Copy the content of `seed.sql` and paste it into the query box.
    *   Click **Go**.

---
**Your database is now ready.**
Update the credentials in `api.php` once the file is created.
