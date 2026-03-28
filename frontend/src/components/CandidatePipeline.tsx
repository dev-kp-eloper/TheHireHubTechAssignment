import { useState } from 'react';
import { Candidate } from '../utils/types';
import CandidateCard from './CandidateCard';

interface CandidatePipelineProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
}

export default function CandidatePipeline({ candidates, onSelectCandidate }: CandidatePipelineProps) {
  const stages = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired'];

  const getCandidatesByStage = (stage: string) => {
    return candidates.filter(c => c.stage === stage);
  };

  const getStatusColor = (stage: string) => {
    const colors: any = {
      'Applied': 'bg-gray-100 text-gray-800',
      'Shortlisted': 'bg-blue-100 text-blue-800',
      'Interview': 'bg-purple-100 text-purple-800',
      'Offered': 'bg-green-100 text-green-800',
      'Hired': 'bg-emerald-100 text-emerald-800'
    };
    return colors[stage] || 'bg-gray-100';
  };

  const getStatusBorder = (stage: string) => {
    const borders: any = {
      'Applied': 'border-gray-300',
      'Shortlisted': 'border-blue-300',
      'Interview': 'border-purple-300',
      'Offered': 'border-green-300',
      'Hired': 'border-emerald-300'
    };
    return borders[stage] || 'border-gray-300';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Candidate Pipeline (Kanban View)</h2>
      
      <div className="overflow-x-auto">
        <div className="flex gap-6 min-w-max pb-4">
          {stages.map(stage => {
            const stageCount = getCandidatesByStage(stage).length;
            
            return (
              <div key={stage} className="flex-shrink-0 w-80">
                <div className={`rounded-lg border-2 ${getStatusBorder(stage)} p-4 h-full`}>
                  {/* Stage Header */}
                  <div className={`flex items-center justify-between p-3 rounded-lg mb-4 ${getStatusColor(stage)}`}>
                    <span className="font-semibold text-sm">{stage}</span>
                    <span className="text-xs font-bold px-2 py-1 bg-white rounded">{stageCount}</span>
                  </div>

                  {/* Candidates List */}
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {getCandidatesByStage(stage).length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">No candidates</p>
                      </div>
                    ) : (
                      getCandidatesByStage(stage).map(candidate => (
                        <CandidateCard
                          key={candidate._id}
                          candidate={candidate}
                          onClick={() => onSelectCandidate(candidate)}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
