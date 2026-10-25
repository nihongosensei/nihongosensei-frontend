import { httpInstrumentationMiddleware } from "@hono/otel";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { UndiciInstrumentation } from "@opentelemetry/instrumentation-undici";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { astro } from "astro/hono";
import { Hono } from "hono";

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [new UndiciInstrumentation()],
});

sdk.start();

const app = new Hono();

app.use(httpInstrumentationMiddleware());

app.use(astro());

export default app;
