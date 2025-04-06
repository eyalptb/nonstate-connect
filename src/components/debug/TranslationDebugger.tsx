
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/translation/TranslationContext';
import useTranslationTester from '@/hooks/useTranslationTester';
import { verifyTranslationKeys } from '@/utils/i18nVerification';

interface TranslationDebuggerProps {
  namespace?: string;
  keys?: string[];
}

const TranslationDebugger: React.FC<TranslationDebuggerProps> = ({
  namespace = 'common',
  keys = [
    'joinCta.heading',
    'joinCta.benefits.secure.title',
    'joinCta.benefits.secure.description'
  ]
}) => {
  const { currentLanguage } = useTranslation();
  const { testTranslation, forceReloadNamespace } = useTranslationTester();
  const [results, setResults] = useState<{
    key: string;
    translation: string;
    success: boolean;
  }[]>([]);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const newResults = keys.map(key => {
      const { translation, success } = testTranslation(key, namespace);
      return { key, translation, success };
    });
    setResults(newResults);
    setLoading(false);
  };

  const reloadNamespace = async () => {
    setLoading(true);
    await forceReloadNamespace(namespace);
    setTimeout(runTests, 300);
  };

  useEffect(() => {
    runTests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, namespace]);

  const successCount = results.filter(r => r.success).length;
  const verificationResult = verifyTranslationKeys(currentLanguage, namespace, keys);

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Translation Debugger</CardTitle>
          <div className="flex space-x-2">
            <Badge variant={successCount === keys.length ? "success" : "destructive"}>
              {successCount}/{keys.length} Keys Working
            </Badge>
            <Badge variant="outline">{currentLanguage}</Badge>
            <Badge variant="outline">{namespace}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end space-x-2">
          <Button size="sm" variant="outline" onClick={runTests} disabled={loading}>
            Test Keys
          </Button>
          <Button size="sm" variant="secondary" onClick={reloadNamespace} disabled={loading}>
            Reload Namespace
          </Button>
        </div>

        <div className="space-y-2">
          {results.map(({ key, translation, success }) => (
            <div key={key} className="flex justify-between items-center p-2 border rounded">
              <div>
                <code className="text-sm bg-muted px-1 py-0.5 rounded">{key}</code>
              </div>
              <div className="flex items-center space-x-2">
                <span className={success ? "text-green-600" : "text-red-600"}>
                  {success ? translation : `"${translation}" (FAILED)`}
                </span>
                <Badge variant={success ? "success" : "destructive"}>
                  {success ? "✓" : "✗"}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {!verificationResult.success && (
          <div className="mt-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <h4 className="font-semibold text-red-600 dark:text-red-400">Missing Keys:</h4>
            <ul className="list-disc list-inside text-sm">
              {verificationResult.missingKeys.map(key => (
                <li key={key} className="text-red-600 dark:text-red-400">
                  <code>{key}</code>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TranslationDebugger;
