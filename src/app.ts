import { Hono } from "hono";
import { httpInstrumentationMiddleware } from "@hono/otel";
import { astro } from "astro/hono";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { UndiciInstrumentation } from "@opentelemetry/instrumentation-undici";

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [new UndiciInstrumentation()],
});

sdk.start();

const app = new Hono();

app.use(httpInstrumentationMiddleware());

app.use(astro());

export default app;
