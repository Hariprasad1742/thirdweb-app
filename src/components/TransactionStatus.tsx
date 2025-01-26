import React from 'react';
import { useContractEvents } from 'thirdweb/react';
import { contract } from '../main';
import type { Log } from 'viem';

type TransactionEventArgs = {
  transactionId: bigint;
  submitter: `0x${string}`;
  data: string;
};

type TransactionEvent = Log<bigint, number, false> & {
  args: TransactionEventArgs;
};

export function TransactionStatus() {
  const {
    data: events,
    isLoading,
    error
  } = useContractEvents({
    contract,
    // @ts-ignore - Known type issue with event configuration
    events: ["TransactionSubmitted"]
  });

  if (isLoading) {
    return (
      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 mt-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 mt-6">
        <h3 className="text-lg font-semibold text-red-500 mb-2">Error Loading Events</h3>
        <p className="text-zinc-400">
          {error instanceof Error ? error.message : 'Failed to load transaction events'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 mt-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      {events && events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event, index) => {
            try {
              const typedEvent = event as unknown as TransactionEvent;
              const eventData = JSON.parse(typedEvent.args.data);

              return (
                <div
                  key={`${typedEvent.blockHash || 'unknown'}-${index}`}
                  className="p-4 bg-zinc-800 rounded-lg border border-zinc-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{eventData.projectName}</h4>
                      <p className="text-sm text-zinc-400 mt-1">
                        Builder: {eventData.builderName}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Amount: {eventData.amount} ETH
                      </p>
                      <p className="text-sm text-zinc-400">
                        Timeline: {eventData.timeline} days
                      </p>
                    </div>
                    <span className="text-xs text-zinc-500">
                      Block #{typedEvent.blockNumber?.toString() || 'pending'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-zinc-500">
                    Tx: {typedEvent.blockHash ? `${typedEvent.blockHash.slice(0, 10)}...` : 'pending'}
                  </div>
                </div>
              );
            } catch (err) {
              console.error('Error parsing event data:', err);
              return null;
            }
          })}
        </div>
      ) : (
        <p className="text-zinc-400">No transactions found</p>
      )}
    </div>
  );
}