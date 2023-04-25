import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface ApiError {
  status?: HttpErrorResponse | HttpResponse<unknown>;
  timestamp?: Date;
  message?: string;
  additionalInformation?: Array<{ [key: string]: unknown }>;
}
