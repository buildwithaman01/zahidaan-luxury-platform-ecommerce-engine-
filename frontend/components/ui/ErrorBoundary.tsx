'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * @file ErrorBoundary.tsx
 * @description A high-order component that catches JavaScript errors anywhere 
 * in its child component tree, logs those errors, and displays a fallback UI 
 * instead of the component tree that crashed.
 */

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('[CRITICAL] Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl shadow-xl border border-gray-100 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We encountered an unexpected error while loading this section. Our team has been notified.
          </p>
          <div className="flex gap-4">
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-[#c5a059] hover:bg-[#b08e4d] text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Reload Page
            </button>
            <a
              href="/"
              className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-300"
            >
              Go to Home
            </a>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-left w-full overflow-auto max-h-40">
              <p className="text-xs font-mono text-red-500 whitespace-pre-wrap">
                {this.state.error?.toString()}
              </p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
