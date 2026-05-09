-- CreateTable
CREATE TABLE "Sales" (
    "invoice_id" TEXT NOT NULL,
    "sales_date" TIMESTAMP(3) NOT NULL,
    "sales_tot" DOUBLE PRECISION NOT NULL,
    "sales_discount" DOUBLE PRECISION NOT NULL,
    "postage_cost" DOUBLE PRECISION NOT NULL,
    "bill_total" DOUBLE PRECISION NOT NULL,
    "sales_stat" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "SalesDetail" (
    "id" SERIAL NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "stock_id" TEXT NOT NULL,
    "nss" INTEGER NOT NULL,

    CONSTRAINT "SalesDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Convection" (
    "conv_id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "depo_amount" INTEGER NOT NULL,
    "remaining_stock" INTEGER NOT NULL,
    "product_status" TEXT NOT NULL,
    "cogs" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Convection_pkey" PRIMARY KEY ("conv_id")
);

-- CreateTable
CREATE TABLE "Receivable" (
    "id" SERIAL NOT NULL,
    "rcv_total" DOUBLE PRECISION NOT NULL,
    "rcv_notes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receivable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DashboardSummaryMonthly" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "total_omset" DOUBLE PRECISION NOT NULL,
    "total_cogs" DOUBLE PRECISION NOT NULL,
    "gross_profit" DOUBLE PRECISION NOT NULL,
    "total_qty_sold" INTEGER NOT NULL,
    "paid_total" DOUBLE PRECISION NOT NULL,
    "unpaid_total" DOUBLE PRECISION NOT NULL,
    "receivable_total" DOUBLE PRECISION NOT NULL,
    "opening_stock" INTEGER NOT NULL,
    "remaining_stock" INTEGER NOT NULL,
    "on_progress_stock" INTEGER NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardSummaryMonthly_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Convection_product_id_key" ON "Convection"("product_id");

-- AddForeignKey
ALTER TABLE "SalesDetail" ADD CONSTRAINT "SalesDetail_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Sales"("invoice_id") ON DELETE RESTRICT ON UPDATE CASCADE;
