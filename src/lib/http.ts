import { NextResponse } from "next/server";
import { HttpError } from "./auth";

export type ApiResponse<T = unknown> = {
  data?: T;
  error?: string;
  details?: string[];
};

export function json<T>(data: T, init?: ResponseInit): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ data }, init);
}

export function error(status: number, message: string, details?: string[]): NextResponse<ApiResponse> {
  return NextResponse.json({ error: message, details }, { status });
}

export function created<T>(data: T): NextResponse<ApiResponse<T>> {
  return json(data, { status: 201 });
}

export function noContent(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

export function notFound(resource?: string): NextResponse<ApiResponse> {
  return error(404, resource ? `${resource} not found` : "Not found");
}

export function badRequest(message: string, details?: string[]): NextResponse<ApiResponse> {
  return error(400, message, details);
}

export function unauthorized(message = "Authentication required"): NextResponse<ApiResponse> {
  return error(401, message);
}

export function forbidden(message = "Forbidden"): NextResponse<ApiResponse> {
  return error(403, message);
}

// ─── Route handler wrapper ───────────────────────────────────────────────────

type RouteHandler = (
  request: Request,
  context?: Record<string, unknown>,
) => Promise<Response | void>;

export function handle(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (e) {
      if (e instanceof HttpError) {
        return error(e.status, e.message);
      }
      console.error("[API Error]", e);
      return error(500, "Internal server error");
    }
  };
}
