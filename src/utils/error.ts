export interface ErrorProps {
  title?: string;
  statusCode: number;
}

class IntendedError extends Error {
  statusCode: number;

  constructor(props: ErrorProps) {
    super(`statusCode: ${String(props.statusCode)} title:${props.title}`);
    this.name = 'IntendedError';
    this.statusCode = props.statusCode;
  }
}

export default IntendedError;
