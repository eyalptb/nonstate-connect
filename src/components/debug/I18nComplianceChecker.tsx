
import React, { useState } from 'react';
import { useI18nCompliance } from '@/hooks/useI18nCompliance';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import i18n from '@/i18n';

interface I18nComplianceCheckerProps {
  requiredKeys?: string[];
  namespace?: string;
  component?: string;
}

const I18nComplianceChecker: React.FC<I18nComplianceCheckerProps> = ({
  requiredKeys = [],
  namespace = 'common',
  component = 'Unknown'
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const compliance = useI18nCompliance(requiredKeys, namespace);
  const supportedLangs = i18n.options.supportedLngs?.filter(
    lang => lang !== 'cimode' && lang !== 'dev' && !lang.includes('-')
  ) || ['en'];
  
  // Function to handle checking all languages
  const checkAllLanguages = () => {
    setShowDetails(true);
    compliance.verifyAllLanguages();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Translation Compliance: {component}</CardTitle>
          {compliance.allLanguagesComplete ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" /> Complete
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <AlertTriangle className="h-3 w-3 mr-1" /> Incomplete
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Verifying {requiredKeys.length} keys across {supportedLangs.length} languages for the {namespace} namespace.
          </p>
          
          <p className="text-sm font-medium mb-1">Current language: {i18n.language}</p>
          
          {compliance.currentLanguageComplete ? (
            <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Complete</AlertTitle>
              <AlertDescription>
                All {requiredKeys.length} translation keys are available for {i18n.language}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="default" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Incomplete</AlertTitle>
              <AlertDescription>
                Missing {compliance.missingByLanguage[i18n.language]?.length || 0} translation keys for {i18n.language}
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        {showDetails && (
          <Tabs defaultValue="overview">
            <TabsList className="w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="missing">Missing Keys</TabsTrigger>
              <TabsTrigger value="required">Required Keys</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
                {supportedLangs.map(lang => (
                  <div key={lang} className="p-2 border rounded flex items-center justify-between">
                    <span className="font-medium">{lang}</span>
                    {!compliance.missingByLanguage[lang] ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="missing">
              <div className="mt-4">
                {Object.keys(compliance.missingByLanguage).length === 0 ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>No missing keys</AlertTitle>
                    <AlertDescription>
                      All languages have complete translations for required keys
                    </AlertDescription>
                  </Alert>
                ) : (
                  Object.entries(compliance.missingByLanguage).map(([lang, keys]) => (
                    <div key={lang} className="mb-4">
                      <h4 className="font-medium">{lang} ({keys.length} missing)</h4>
                      <div className="text-sm bg-muted p-2 rounded mt-1 max-h-32 overflow-y-auto">
                        <ul className="list-disc pl-5">
                          {keys.map(key => (
                            <li key={key}>{key}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="required">
              <div className="mt-4 max-h-64 overflow-y-auto bg-muted p-2 rounded">
                <ul className="list-disc pl-5">
                  {compliance.requiredKeys.map(key => (
                    <li key={key} className="text-sm">{key}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
          <Button onClick={checkAllLanguages}>
            Verify All Languages
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default I18nComplianceChecker;
