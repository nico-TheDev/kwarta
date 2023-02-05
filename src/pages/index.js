import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Balance } from "../components/dashboard/balance";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { Savings } from "../components/dashboard/savings";
import { Income } from "../components/dashboard/income";
import { Expenses } from "../components/dashboard/expenses";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => (
  <>
    <Head>
      <title>CASH: Financial Monitoring Application</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Balance />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Expenses sx={{ height: "100%" }} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Income />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Savings />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
