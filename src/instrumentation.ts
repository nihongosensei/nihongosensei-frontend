import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { UndiciInstrumentation } from "@opentelemetry/instrumentation-undici";
import { NodeSDK } from "@opentelemetry/sdk-node";
import process from "node:process";

function init() {
  const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter(),
    instrumentations: [new UndiciInstrumentation()],
  });

  sdk.start();

  console.log("tracing loaded");

  process.on("SIGTERM", () => {
    sdk
      .shutdown()
      .then(() => {
        console.log("Tracing terminated");
      })
      .catch((error: unknown) => {
        console.error("Error terminating tracing", error);
      })
      .finally(() => process.exit(0));
  });
}

init();
