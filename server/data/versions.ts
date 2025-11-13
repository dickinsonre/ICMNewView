import { Version } from "@shared/schema";

export const versionsData: Version[] = [
  {
    id: "2026.2",
    version: "2026.2",
    releaseDate: "2024-11-13",
    features: [
      {
        id: "2026.2-esri",
        title: "Esri Integration Features",
        description: "Enhanced integration with Esri GIS platforms for improved spatial data management and analysis.",
        category: "Integration"
      },
      {
        id: "2026.2-admin",
        title: "Project Administration Tools",
        description: "New administrative features for better project management and collaboration.",
        category: "Administration"
      }
    ]
  },
  {
    id: "2026.1",
    version: "2026.1",
    releaseDate: "2026-06-01",
    features: [
      {
        id: "2026.1-cloud",
        title: "Cloud Capabilities Enhancements",
        description: "Continued improvements to cloud integration that started in version 2024.0, enabling better cloud-based simulations and data management.",
        category: "Cloud"
      },
      {
        id: "2026.1-flood",
        title: "Autodesk InfoWorks ICM Flood",
        description: "New Autodesk product using ICM's hydrological and hydraulic modelling for event-based forecasting and risk assessment for networks up to 1000 nodes. Requires a Flood licence.",
        category: "Product"
      },
      {
        id: "2026.1-sewer-rebrand",
        title: "InfoWorks ICM Standard Rebranded as InfoWorks ICM Sewer",
        description: "The Autodesk product InfoWorks ICM Standard is rebranded as InfoWorks ICM Sewer. The Sewer product still uses a Standard licence and all functionality remains available.",
        category: "Product"
      },
      {
        id: "2026.1-ruby",
        title: "Ruby Scripts as Database Items",
        description: "Ruby scripts can now be added as database items with a new Ruby script editor to add, view, edit, validate syntax, and run scripts directly in the GeoPlan. Can also import external Ruby script files.",
        category: "Development"
      },
      {
        id: "2026.1-ruby-custom",
        title: "Ruby Scripts in Custom Actions",
        description: "Ruby Script database items can now be included in Custom actions, providing more flexible automation workflows.",
        category: "Development"
      },
      {
        id: "2026.1-subgrid-expansion",
        title: "Additional Network Objects for Subgrid Sampling",
        description: "Expanded Subgrid Sampling support to include River Reach - Bank Flows (when connected to 2D zones) and Inline banks (when acting as 1D-2D links).",
        category: "Subgrid Sampling"
      },
      {
        id: "2026.1-swmm-flow",
        title: "Display Improvement for Flow in SWMM Nodes",
        description: "Increased precision for node's Baseline inflow, Base flow, and Base flow for Additional DWF properties from 3 to 5 when using metric units.",
        category: "SWMM"
      },
      {
        id: "2026.1-swmm-stage-flow",
        title: "Importing InfoSWMM Stage-Flow Outfalls to SWMM Networks",
        description: "Stage-Flow type outfalls from InfoSWMM can now be imported to ICM SWMM networks as SWMM nodes with Free type output.",
        category: "SWMM"
      },
      {
        id: "2026.1-swmm-rating",
        title: "Importing InfoSWMM Rating Curve Outlets to SWMM Networks",
        description: "Outlets with Tabular Inflow-Outflow rating curves from InfoSWMM can now be imported as Outlet types with Functional/Depth Rating curves.",
        category: "SWMM"
      },
      {
        id: "2026.1-operator-client",
        title: "Autodesk ICMLive Operator Client for InfoWorks ICM Flood",
        description: "ICMLive Operator Client is installed with Autodesk InfoWorks ICM Flood, allowing Flood users to view areas of interest, see alerts, and analyze live run results.",
        category: "ICMLive"
      }
    ]
  },
  {
    id: "2026.0",
    version: "2026.0",
    releaseDate: "2025-04-01",
    features: [
      {
        id: "2026.0-cloud",
        title: "Cloud Capabilities Enhancements",
        description: "Continued improvements to cloud integration that started in version 2024.0.",
        category: "Cloud"
      },
      {
        id: "2026.0-subgrid",
        title: "Subgrid Sampling Technical Preview",
        description: "New method for enhancing topographic representation in InfoWorks 2D models with finer triangular mesh for each 2D element. Improves predictive ability without compromising performance or accuracy.",
        category: "Subgrid Sampling"
      },
      {
        id: "2026.0-subgrid-results",
        title: "Subgrid Sampling Results",
        description: "New results available for 2D zones with Subgrid Sampling: Mean depth, Volume (time-varying and summary), and Subgrid flag. Includes support for Network Results Point 2D objects.",
        category: "Subgrid Sampling"
      },
      {
        id: "2026.0-icmlive",
        title: "ICMLive for Autodesk InfoWorks ICM Ultimate",
        description: "ICMLive functionality now available in ICM Ultimate to convert hydrologic and hydraulic network models into near real-time forecasting systems. Includes Live groups, Action Lists, Alert Definition Lists, Manifests, and Manifest Deployments.",
        category: "ICMLive"
      },
      {
        id: "2026.0-operator",
        title: "Autodesk ICMLive Operator Client",
        description: "Now installed with Autodesk InfoWorks ICM as part of the ICMLive system for viewing and operating live simulations.",
        category: "ICMLive"
      },
      {
        id: "2026.0-swmm-validation",
        title: "SWMM Network Validation Performance",
        description: "Validation for SWMM networks with maximum depth set for Junction or Storage nodes is now significantly quicker.",
        category: "SWMM"
      },
      {
        id: "2026.0-tsd",
        title: "TSD Background Updates",
        description: "Updates of Scalar or Spatial time series data (TSD) can now be performed by InfoWorks ICM as a background process.",
        category: "Data Management"
      },
      {
        id: "2026.0-analytics",
        title: "Desktop Analytics Privacy Settings",
        description: "New Privacy Settings dialog for 64-bit versions (existing Data Collection dialog for 32-bit) to control usage analysis and help improve software quality.",
        category: "Administration"
      },
      {
        id: "2026.0-geoplan-perf",
        title: "GeoPlan Performance Improvements for 2D Meshes",
        description: "Improved GeoPlan performance when displaying large 2D meshes, with faster pan, zoom, and properties tools.",
        category: "Performance"
      },
      {
        id: "2026.0-cuda",
        title: "CUDA Update to 12.6.3",
        description: "Updated to CUDA 12.6.3. NVIDIA drivers may need updating for compatibility. Only cards with compute capability 5.0 or higher supported.",
        category: "System"
      }
    ]
  },
  {
    id: "2025.4",
    version: "2025.4",
    releaseDate: "2024-10-01",
    features: [
      {
        id: "2025.4-viewer",
        title: "Autodesk InfoWorks ICM Viewer",
        description: "New viewer allowing users to view model data and analyze existing results without needing an Autodesk licence, only an Autodesk account required.",
        category: "Product"
      },
      {
        id: "2025.4-2d-histogram",
        title: "2D Mesh Element Histograms",
        description: "New feature to identify 2D mesh element areas smaller than specified minimum element size, helping detect model instability and simulation performance issues.",
        category: "Meshing"
      },
      {
        id: "2025.4-results-element",
        title: "Results element 2D objects",
        description: "Results Analysis database items can now contain read-only Results element 2D objects automatically generated from 2D Mesh Element Histogram for mesh inspection.",
        category: "Results"
      },
      {
        id: "2025.4-swmm-results",
        title: "Results analysis for SWMM networks",
        description: "Result analysis items now available for SWMM networks with Results point, line, polygon objects and Results element objects for 2D mesh interrogation.",
        category: "SWMM"
      },
      {
        id: "2025.4-muskingum",
        title: "Muskingum output routing method for InfoWorks subcatchments",
        description: "New Muskingum routing option for subcatchment outflow through notional reach with travel time and discharge weighting factor.",
        category: "Hydrology"
      },
      {
        id: "2025.4-rpa-export",
        title: "Exporting Return Period Analysis grid report to CSV",
        description: "New Export CSV button added to RPA report view for exporting results data to CSV files.",
        category: "Results"
      },
      {
        id: "2025.4-ruby-rpa",
        title: "Exporting RPA data to CSV using Ruby scripting",
        description: "New rpa_export Ruby script method for programmatically exporting RPA results to CSV.",
        category: "Development"
      },
      {
        id: "2025.4-ruby-rainfall",
        title: "Adding design rainfall events using Ruby scripting",
        description: "New new_synthetic_rainfall Ruby method for adding design rainfall events to models programmatically.",
        category: "Development"
      },
      {
        id: "2025.4-ruby-tsd",
        title: "Adding TSD objects using Ruby scripting",
        description: "New WSTSDObject class for adding TSD objects to database and accessing time series data via WSOpenTSD class methods.",
        category: "Development"
      },
      {
        id: "2025.4-state-performance",
        title: "State file initialisation time improvement",
        description: "Loading state files from simulations with different 2D meshes now 10-15 times faster, reducing initialisation time significantly.",
        category: "Performance"
      }
    ]
  },
  {
    id: "2025.3",
    version: "2025.3",
    releaseDate: "2024-09-01",
    features: [
      {
        id: "2025.3-placeholder",
        title: "Version 2025.3 Features",
        description: "Features for version 2025.3 - September 2024. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2025.2",
    version: "2025.2",
    releaseDate: "2024-07-01",
    features: [
      {
        id: "2025.2-placeholder",
        title: "Version 2025.2 Features",
        description: "Features for version 2025.2 - July 2024. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2025.1",
    version: "2025.1",
    releaseDate: "2024-05-01",
    features: [
      {
        id: "2025.1-placeholder",
        title: "Version 2025.1 Features",
        description: "Features for version 2025.1 - May 2024. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2025.0",
    version: "2025.0",
    releaseDate: "2024-04-01",
    features: [
      {
        id: "2025.0-placeholder",
        title: "Version 2025.0 Features",
        description: "Features for version 2025.0 - April 2024. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2025.5",
    version: "2025.5",
    releaseDate: "2024-11-01",
    features: [
      {
        id: "2025.5-cloud",
        title: "Cloud Capabilities Enhancements",
        description: "Continued improvements to cloud integration that started in version 2024.0.",
        category: "Cloud"
      },
      {
        id: "2025.5-copy-results",
        title: "Copying Cloud Simulation Results",
        description: "Can now copy simulation results from cloud database runs (with full results downloaded) to transportable database version 2024.5 or newer. Enables sharing results between cloud and on-premise databases.",
        category: "Cloud"
      },
      {
        id: "2025.5-risk",
        title: "Risk Analysis Runs for Cloud Databases",
        description: "Risk analysis run objects can now be added to cloud databases. Simulations run on-premise but leverage cloud database infrastructure. Includes support for Damage functions, Damage receptors, and Risk impact zones.",
        category: "Cloud"
      },
      {
        id: "2025.5-netcdf",
        title: "NetCDF File Formats for Spatial TSD Objects",
        description: "Extended support for NetCDF source projection formats. Data on Latitude Longitude grid with WGS84 datum can be imported using NetCDF AUS.BOM option.",
        category: "Data Management"
      }
    ]
  },
  {
    id: "2024.4",
    version: "2024.4",
    releaseDate: "2023-11-01",
    features: [
      {
        id: "2024.4-placeholder",
        title: "Version 2024.4 Features",
        description: "Features for version 2024.4 - November 2023. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2024.3",
    version: "2024.3",
    releaseDate: "2023-09-01",
    features: [
      {
        id: "2024.3-placeholder",
        title: "Version 2024.3 Features",
        description: "Features for version 2024.3 - September 2023. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2024.5",
    version: "2024.5",
    releaseDate: "2024-01-01",
    features: [
      {
        id: "2024.5-cloud",
        title: "Cloud Capabilities Enhancements",
        description: "Continued improvements to cloud integration that started in version 2024.0.",
        category: "Cloud"
      },
      {
        id: "2024.5-download-choice",
        title: "Choose Simulation Results Download Type",
        description: "New Download Cloud Results dialog lets you select which type of results to automatically download (full or summary) when simulations complete. Full results always remain available in the cloud.",
        category: "Cloud"
      },
      {
        id: "2024.5-download-options",
        title: "Additional Download Options for Cloud Results",
        description: "More flexible result downloading: batch download for multiple simulations, right-click download options for full or summary results, and upgrade summary results to full results.",
        category: "Cloud"
      },
      {
        id: "2024.5-delete-results",
        title: "Deleting Results for Cloud Simulations",
        description: "Two new deletion options: Delete all local results and Delete local non-summary results. Full results remain available for download from cloud.",
        category: "Cloud"
      },
      {
        id: "2024.5-exchange-download",
        title: "Downloading Results Using ICM Exchange",
        description: "New WSApplication.launch_sims_ex method with additional options including RunOn and DownloadSelection. WSSimObject run_ex method has new DownloadSelection key.",
        category: "Integration"
      },
      {
        id: "2024.5-rafts",
        title: "Increased Values for Equivalent Manning's n",
        description: "RAFTS routing model limits for Equivalent Manning's n increased from 0.01-0.1 to 0.001-2.0. Values above 0.25 trigger warnings. PERN values for >0.1 found by linear extrapolation.",
        category: "Hydrology"
      }
    ]
  },
  {
    id: "2024.1",
    version: "2024.1",
    releaseDate: "2023-05-01",
    features: [
      {
        id: "2024.1-placeholder",
        title: "Version 2024.1 Features",
        description: "Features for version 2024.1. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2024.0",
    version: "2024.0",
    releaseDate: "2023-04-01",
    features: [
      {
        id: "2024.0-placeholder",
        title: "Version 2024.0 Features - Cloud Capabilities Introduction",
        description: "Features for version 2024.0 - introduced cloud integration. Please provide the full 'What's New' content to populate this version.",
        category: "Cloud"
      }
    ]
  },
  {
    id: "11.0",
    version: "11.0",
    releaseDate: "2020-05-01",
    features: [
      {
        id: "11.0-placeholder",
        title: "Version 11.0 Features",
        description: "Features for version 11.0 - May 2020. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "10.5",
    version: "10.5",
    releaseDate: "2019-12-01",
    features: [
      {
        id: "10.5-placeholder",
        title: "Version 10.5 Features",
        description: "Features for version 10.5 - December 2019. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "10.0",
    version: "10.0",
    releaseDate: "2019-05-01",
    features: [
      {
        id: "10.0-placeholder",
        title: "Version 10.0 Features",
        description: "Features for version 10.0 - May 2019. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "9.5",
    version: "9.5",
    releaseDate: "2018-11-01",
    features: [
      {
        id: "9.5-placeholder",
        title: "Version 9.5 Features",
        description: "Features for version 9.5 - November 2018. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "9.0",
    version: "9.0",
    releaseDate: "2018-05-01",
    features: [
      {
        id: "9.0-placeholder",
        title: "Version 9.0 Features",
        description: "Features for version 9.0 - May 2018. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "5.0",
    version: "5.0",
    releaseDate: "2014-05-01",
    features: [
      {
        id: "5.0-initial-conditions",
        title: "Initial Conditions 1D Editor",
        description: "New Initial Conditions 1D tree object for assigning initial hydraulic values to nodes and river reaches at simulation start, overriding initial state simulation values when included in Schedule Hydraulic Run View.",
        category: "Modeling"
      },
      {
        id: "5.0-2d-mesh-init",
        title: "Initialize 2D Mesh from Different Mesh",
        description: "Use initial state simulations with different 2D meshes linked by 2D Zone ID, supporting re-meshed zones after small network changes without requiring mesh matching.",
        category: "Modeling"
      },
      {
        id: "5.0-sediment-transport",
        title: "2D Suspended Sediment Transport",
        description: "New erosion-deposition modeling in 2D networks via 'Model 2D erosion-deposition' option in QM Parameters Dialog with water quality and sediment parameters for erosion-deposition calculations.",
        category: "Water Quality"
      },
      {
        id: "5.0-ukwir-runoff",
        title: "UKWIR Runoff Volume Models",
        description: "UKWIRPaved and UKWIRPerv runoff volume types for runoff surfaces supporting multiple paved and pervious surfaces based on UKWIR model as replacement for New UK PR Model per UKWIR Equation Guide (2014).",
        category: "Hydrology"
      },
      {
        id: "5.0-japanese-models",
        title: "Japanese Rainfall Runoff Models",
        description: "Support for Japanese models including f1-Rsa runoff volume method, Kadoya coefficient for Quasi Linear Reservoir Method, Non-linear Storage Function Method, and Rational hydrograph method with rational formula.",
        category: "Hydrology"
      },
      {
        id: "5.0-node-inference",
        title: "Node Ground Level Inference from Mesh Elements",
        description: "New inference rule allowing node ground levels to be automatically inferred from ground level of containing mesh element.",
        category: "Tools"
      },
      {
        id: "5.0-risk-geoplan",
        title: "Risk Analysis Results in GeoPlan",
        description: "Risk analysis simulation and results now loadable in GeoPlan with viewing via themes, grid/graph tools, and network results grids for damage receptors and associated polygons (previously HTML log only).",
        category: "Results"
      },
      {
        id: "5.0-risk-polygon-areas",
        title: "Risk Analysis Polygon Area Fallback",
        description: "Risk analysis with Relative to Area damage curves now uses sum of associated polygon areas when damage receptor area is undefined.",
        category: "Modeling"
      },
      {
        id: "5.0-damage-function-csv",
        title: "Damage Function CSV Import/Export",
        description: "Enhanced Damage Function with general CSV import/export capabilities beyond previous Multi-Coloured Handbook format limitation.",
        category: "Data Management"
      },
      {
        id: "5.0-gis-batch-export",
        title: "Batch Export Time Varying Results to GIS",
        description: "Export time varying results for timestep ranges at specified intervals or for timestep lists loaded from CSV files to GIS formats.",
        category: "Integration"
      },
      {
        id: "5.0-inundation-results",
        title: "Enhanced 2D Inundation Results",
        description: "New 2D mesh summary results in Mesh Element Properties Dialog: 'Time to last inundation' and 'Total inundation duration' based on inundation mapping depth threshold from 2D Parameters Advanced tab.",
        category: "Results"
      },
      {
        id: "5.0-ground-level-results",
        title: "Ground Level Results for 2D Network Results Objects",
        description: "Mean, max, and min ground level results now available for Network Results Line (2D) and Network Results Polygon (2D) objects in results grids and property sheets.",
        category: "Results"
      },
      {
        id: "5.0-observed-rainfall-reports",
        title: "Observed Rainfall Support for RPA and Worst Case Reports",
        description: "Return Period Analysis and Worst Case reports now use observed rainfall when return period and duration available from Sub-event or Profile properties in rainfall events.",
        category: "Results"
      },
      {
        id: "5.0-sql-enhancements",
        title: "SQL Enhancements",
        description: "Subcatchments available as one-to-many link from nodes. New NL() function for newline characters and NVL(x,y) function for null value handling. DELETE FROM syntax for removing rows from object arrays with conditional filtering.",
        category: "Development"
      },
      {
        id: "5.0-inline-bank-validation",
        title: "Inline Bank Validation Improvement",
        description: "Network validation now displays errors when discharge coefficient or modular limit data missing from inline bank section data.",
        category: "Data Management"
      },
      {
        id: "5.0-preprocessing-performance",
        title: "Network Results Objects Preprocessing Performance",
        description: "Significant reduction in pre-processing time for large numbers of network results objects.",
        category: "Performance"
      },
      {
        id: "5.0-initial-state-performance",
        title: "Initial State Simulation Performance Improvements",
        description: "Reduced flexible state loading time for simulations, significantly decreasing run times particularly for large networks.",
        category: "Performance"
      },
      {
        id: "5.0-tsdb-historic-mode",
        title: "TSDB Historic Mode",
        description: "New Historic mode checkbox in TSDB Options using Run origin time as historic time, including only observed values up to origin and forecasts with earlier origins for historical data stream simulations with user edits.",
        category: "Data Management"
      },
      {
        id: "5.0-tsdb-data-sources",
        title: "TSDB iHistorian and ClearSCADA Support",
        description: "Support for iHistorian (GE Intelligent Platforms) and ClearSCADA (Schneider Electric) telemetry data source formats for scalar time series databases.",
        category: "Integration"
      },
      {
        id: "5.0-tsdb-csv-performance",
        title: "TSDB CSV Update Performance Improvements",
        description: "Enhanced TSDB update performance from CSV files with automatic separation of successfully loaded entries to 'loaded' subdirectory and failed entries to 'failed' subdirectory.",
        category: "Performance"
      },
      {
        id: "5.0-tsdb-security",
        title: "TSDB Password Security Enhancement",
        description: "Password characters in Data Sources tab of Time Series Database editor now displayed as asterisks instead of plain text.",
        category: "Administration"
      },
      {
        id: "5.0-replay-clock-enhancement",
        title: "Replay Clock Run Origin Indicator",
        description: "Blue vertical bar added to replay clock at run origin time when viewing TSDB simulation replays in Network Page.",
        category: "Usability"
      }
    ]
  },
  {
    id: "4.5",
    version: "4.5",
    releaseDate: "2013-12-01",
    features: [
      {
        id: "4.5-damage-receptors",
        title: "Damage Receptors and Functions",
        description: "New Damage Receptor point objects for structures/buildings in 2D meshes with flood duration and maximum depth results. New Damage Function database items with curves from Multi-Coloured Handbook and CD 2010 for defining flood depth-damage relationships.",
        category: "Modeling"
      },
      {
        id: "4.5-risk-analysis-run",
        title: "Risk Analysis Run with Expected Annual Damage",
        description: "Risk Analysis Run scheduler for multiple events calculating damage costs at Damage Receptors using event probability to produce Expected Annual Damage (EAD) values. Includes damage calculation timestep multiplier in 2D Parameters and subevent properties (Return period, Storm duration, Return period type) in Rainfall Events.",
        category: "Modeling"
      },
      {
        id: "4.5-spatial-rainfall-theme",
        title: "Spatial Rainfall Intensity Theme for Maximum Results",
        description: "Maximum spatial rainfall intensity now displayed using rainfall theme when showing maximum results on GeoPlan, with status bar display of maximum intensity values.",
        category: "Visualization"
      },
      {
        id: "4.5-long-section-enhancements",
        title: "Long Section Window Enhancements",
        description: "Secondary water level line display for simulation comparisons, total head line display capability, and improved horizontal scale shown when zoomed in even without visible manholes.",
        category: "Visualization"
      },
      {
        id: "4.5-eacsd-import",
        title: "EACSD File Format Import",
        description: "New ability to import network objects from EACSD v3.2 format files including cross sections, river reach centre lines, and bank lines.",
        category: "Integration"
      },
      {
        id: "4.5-area-averaged-rainfall",
        title: "Area-Averaged Subcatchment Rainfall",
        description: "New 'Use area-averaged rain' option for subcatchments to calculate rainfall as area-average of all overlapping rainfall polygons, addressing limitations with large subcatchments and high-resolution spatial rainfall data.",
        category: "Hydrology"
      },
      {
        id: "4.5-rain-gauge-boundaries",
        title: "Enhanced Rain Gauge Boundaries",
        description: "Increased Gauge data field size in Rainfall Event properties allowing more complex Rain Gauge Boundaries with large numbers of vertices.",
        category: "Hydrology"
      },
      {
        id: "4.5-head-flow-structures",
        title: "Base Linear Structures with User-Defined Head-Flow Relationship",
        description: "New Head Unit Flow table objects for controlling flow across Base Linear Structures using user-defined head-flow relationships, with head calculated as difference between upstream water level and downstream level or crest level.",
        category: "Modeling"
      },
      {
        id: "4.5-2d-point-source-results",
        title: "2D Point Source Results",
        description: "Comprehensive results viewing for 2D point source objects via pick tools, results grids, graph reports, custom graphs, statistical reports, and CSV export with gauged results support.",
        category: "Results"
      },
      {
        id: "4.5-water-quality-results",
        title: "Enhanced Water Quality Results",
        description: "Saturated dissolved oxygen results now output for DO simulations in Time Varying Results Grid, plus new maximum results attributes for subcatchments displayed in Results Grids and Property Sheets.",
        category: "Water Quality"
      },
      {
        id: "4.5-defconloss-runoff",
        title: "Deficit and Constant Loss Runoff Model",
        description: "New DefConLoss runoff volume type based on HEC-HMS model with single soil layer subject to evaporative loss, reaching saturation capacity before infiltration and excess runoff.",
        category: "Hydrology"
      },
      {
        id: "4.5-river-section-editing",
        title: "River Line Section Editing by Offset",
        description: "New context menu options in Sections Editor for 'Edit offset' and 'Insert row at offset' allowing precise vertex editing and insertion by specified offset with linear interpolation.",
        category: "Tools"
      },
      {
        id: "4.5-network-editing-tools",
        title: "Network Editing Enhancements",
        description: "Split link option when moving node onto conduit/river reach link, plus update base linear structure crest level data from ground models using Update from Ground Model Dialog.",
        category: "Tools"
      },
      {
        id: "4.5-simulation-diagnostics",
        title: "Enhanced Simulation Diagnostics and Initialization",
        description: "New 'Exit if TVD Profile ID is not matched' diagnostic option for event validation, plus optional 'Initialise by level fill-in from outfalls' checkbox to control tide level propagation during initialization.",
        category: "Modeling"
      },
      {
        id: "4.5-validation-themes",
        title: "Validation and Theme Improvements",
        description: "Network preference changes (GIS layers, themes) no longer require validation before simulation. SQL expression themes now work without results loaded on GeoPlan.",
        category: "Usability"
      },
      {
        id: "4.5-scenario-management",
        title: "Scenario Management Enhancements",
        description: "Create new base networks from scenarios via Duplicate button in Manage Scenarios Dialog. Improved conflict resolution with Commit history button. Re-established base-scenario field links when values match. Full object commit history viewing with Show Base option for scenario objects.",
        category: "Version Control"
      },
      {
        id: "4.5-geoplan-usability",
        title: "GeoPlan Usability Improvements",
        description: "CTRL+click to show/hide multiple object layer visibility, new Selectable checkbox for unselectable layers, GIS snapping mode (press 'g' key) for snapping to GIS layer vertices, improved Previous view navigation, and adjustable custom label callout line width.",
        category: "Usability"
      },
      {
        id: "4.5-custom-reports-sql",
        title: "Custom Reports and SQL Enhancements",
        description: "Support for .xlsm format custom report templates (Excel 2007+). New SQL FIXED function for converting numbers to strings with fixed decimal places (0-8) with rounding.",
        category: "Development"
      },
      {
        id: "4.5-gpu-improvements",
        title: "GPU Engine Water Quality Support",
        description: "GPU engine now supports water quality results for network results objects, expanding GPU-accelerated capabilities beyond hydraulics.",
        category: "Performance"
      },
      {
        id: "4.5-job-submission",
        title: "Job Submission and Control Improvements",
        description: "Redesigned Simulation/Job Control and Progress Windows with job type column and enhanced tooltips. Renamed dialogs and fields to support different job types beyond simulations.",
        category: "Administration"
      },
      {
        id: "4.5-tsdb-enhancements",
        title: "Time Series Database (TSDB) Enhancements",
        description: "User permission controls at action level (Owner, Editor, User, Viewer). Update TSDB from external sources with background processing. Use historic TSDB versions in runs via TSDB version time selection in run scheduler.",
        category: "Administration"
      },
      {
        id: "4.5-integration-updates",
        title: "Integration and Format Support Updates",
        description: "AutoCAD 2014 format support for import/export. ArcGIS 10.2 support with ArcObjects map control. UTF-8 encoding for CSV network data import/export supporting non-Western Latin characters.",
        category: "Integration"
      },
      {
        id: "4.5-soft-licensing",
        title: "Soft Licensing System",
        description: "New flexible soft licence authorization alternative to dongles with check-out/check-in capability and on-demand network licences from floating server. Configured via Licence Setup Wizard with support for working offline or remotely.",
        category: "Administration"
      }
    ]
  },
  {
    id: "4.0",
    version: "4.0",
    releaseDate: "2013-06-01",
    features: [
      {
        id: "4.0-spatial-bookmarks",
        title: "Spatial Bookmarks",
        description: "New named markers to identify and save zoom extents for particular locations or object selections, displayed in Spatial Bookmarks Window for quick navigation to saved views around the network.",
        category: "Usability"
      },
      {
        id: "4.0-print-layouts",
        title: "Print Layout Enhancements",
        description: "Extended print layouts with new frame types (Graph, Grid, Flag, Locator, Scale) and batch printing capability from Spatial Bookmarks for multiple bookmarked views.",
        category: "Usability"
      },
      {
        id: "4.0-data-flags",
        title: "Data Flags Window",
        description: "New dockable window displaying all Data Flags in the current master database for improved data quality management.",
        category: "Usability"
      },
      {
        id: "4.0-proximity-trace",
        title: "Proximity Trace Enhancements",
        description: "Enhanced proximity search with selection-only search option, checkbox selection for snapping objects, bidirectional snap (link-to-node or node-to-link), and vertex-only search mode.",
        category: "Tools"
      },
      {
        id: "4.0-saved-states",
        title: "Flexible Saved State Initialization",
        description: "Greater flexibility allowing saved states to initialize simulations using different networks, versions, and scenarios from those used to generate the saved state.",
        category: "Modeling"
      },
      {
        id: "4.0-pdm-runoff",
        title: "Probability Distributed Model (PDM) Runoff Surface",
        description: "New PDM runoff volume type with PDM Descriptor objects for rainfall-runoff parameters, subcatchment association, and RS network data import support. Also supports baseflow and soil moisture deficit modeling with SRM.",
        category: "Hydrology"
      },
      {
        id: "4.0-srm-runoff",
        title: "Simple Runoff Model (SRM) Runoff Surface",
        description: "New SRM runoff volume type using soil moisture deficit time series with constant runoff coefficient for effective rainfall calculation, applied to simplified PDM model with double linear reservoir routing. Includes soil moisture deficit profiles in Rainfall Events.",
        category: "Hydrology"
      },
      {
        id: "4.0-temperature-profiles",
        title: "Multiple Temperature Profiles in Rainfall Events",
        description: "Support for multiple temperature profiles in Rainfall Events for snow melt and PDM runoff modeling, with profile ID matching to rainfall gauges or single profile applied to all gauges.",
        category: "Hydrology"
      },
      {
        id: "4.0-line-extension",
        title: "Line Object Extension with Edit Geometry Tool",
        description: "New capability to extend line objects by adding vertices to beginning or end using edit geometry tool with CTRL+click functionality.",
        category: "Tools"
      },
      {
        id: "4.0-ground-model-sampling",
        title: "Ground Model Sampling Tool Enhancements",
        description: "Comprehensive improvements including 'Do not insert vertices between existing vertices' option for river lines, level-area value sampling for storage/pond nodes, and ground model selection box in Update from Ground Model Dialog.",
        category: "Tools"
      },
      {
        id: "4.0-breach-display",
        title: "Breach Display Improvements",
        description: "Enhanced breach visualization with varying bank level trace in Cross Section Window, elevation reporting for all vertices in Base Linear Structure results, and varying elevations displayed in 3D Network Window for banks and linear structures with breaches.",
        category: "Visualization"
      },
      {
        id: "4.0-overtopping-flow",
        title: "Overtopping Flow Calculation Method Selection",
        description: "New Overtopping flow type field for 2D sluices and bridges allowing selection between Free (fully free) and Controlled (fully controlled) flow calculation methods to address oscillation issues.",
        category: "Modeling"
      },
      {
        id: "4.0-river-validation",
        title: "River Reach Validation Improvements",
        description: "New validation warnings for inconsistent river reach geometry when River Lines or river reach sections/banks have x,y geometry changes after reach or boundary construction.",
        category: "Data Management"
      },
      {
        id: "4.0-flood-theme-performance",
        title: "Flood Theme Performance Enhancement",
        description: "Water level interpolation now only performed when flood theme is turned on, significantly speeding up Ground Model loading in simulation results for large models.",
        category: "Performance"
      },
      {
        id: "4.0-tsdb-deletion",
        title: "Historical Time Series Data Deletion",
        description: "New capability to delete historical data from time series databases with deletion upper limit settings and option to keep latest value versions even if unused in simulations.",
        category: "Data Management"
      },
      {
        id: "4.0-mesh-element-dialog",
        title: "2D Mesh Element Properties Dialog Improvements",
        description: "Enhanced modeless dialog allowing simultaneous work in other interface parts, multiple dialogs open at once, auto-updating element results grid during replay, Find in GeoPlan button, and access from 2D zone property sheet.",
        category: "Usability"
      },
      {
        id: "4.0-label-suppression",
        title: "Rotated Link Label Clash Suppression",
        description: "Rotate Link Labels and Suppress Clashing Labels options now work together, preventing overlapping rotated labels on GeoPlan.",
        category: "Visualization"
      },
      {
        id: "4.0-commit-history",
        title: "Commit History Performance Improvement",
        description: "Commit History Dialog now displays most recent 100 commits by default with Show More (next 100) and Show All buttons for faster viewing of networks with large commit histories.",
        category: "Performance"
      },
      {
        id: "4.0-toolbar-split",
        title: "Windows Toolbar Split",
        description: "Windows toolbar divided into separate Windows Toolbar (network data windows) and Docking Windows Toolbar (docking windows control) for improved usability.",
        category: "Usability"
      },
      {
        id: "4.0-mapxtreme-upgrade",
        title: "MapXtreme 7.1 Upgrade with WMS 1.3 Support",
        description: "Upgrade to MapXtreme 7.1 enabling WMS version 1.3 image loading onto GeoPlan as background layers when using MapXtreme map control.",
        category: "Integration"
      }
    ]
  },
  {
    id: "3.5",
    version: "3.5",
    releaseDate: "2013-02-01",
    features: [
      {
        id: "3.5-tsdb",
        title: "Time Series Database (TSDB) Support for Live Data",
        description: "New Scalar and Spatial Time Series Databases providing intermediate store between external data sources (SCADA/telemetry/RADAR) and simulations. Supports multiple formats (Grib1/2, NEXRAD, NIMROD, shapefile, X-MP) with Spatial Rain Zones and Spatial Rain Sources for priority control and area restriction.",
        category: "Data Management"
      },
      {
        id: "3.5-regulator-events",
        title: "Regulator Events",
        description: "New event type for direct and indirect control of regulator structures including weir crest levels, pump switching, and pump speed, usable instead of or to override Real Time Control (RTC).",
        category: "Modeling"
      },
      {
        id: "3.5-manual-breaches",
        title: "Manual Breaches in Banks and Linear Structures",
        description: "New capability to model manual breaches in river reach banks, inline banks, and 2D base linear structures using RTC definitions to specify vertical movement of points along structures with respect to time.",
        category: "Modeling"
      },
      {
        id: "3.5-2d-structures",
        title: "Enhanced 2D Linear Structures",
        description: "New Bridge Linear Structure (2D) objects for bridge opening/deck dimensions and discharge coefficients, plus new Flow type field for 2D sluice structures to select flow calculation method with backward compatibility support.",
        category: "Modeling"
      },
      {
        id: "3.5-h2s-modeling",
        title: "Hydrogen Sulphide (H2S) Modeling",
        description: "New water quality process to model H2S buildup in pipes and closed nodes when BOD is modeled, expanding water quality simulation capabilities.",
        category: "Water Quality"
      },
      {
        id: "3.5-fhwa-headloss",
        title: "FHWA Headloss Type",
        description: "New built-in headloss type based on Federal Highway Administration Inlet and Access Hole Energy Loss Method (FHWA HEC 22 Urban Drainage Manual) for closed conduits connected to manholes with new Benching method field for nodes.",
        category: "Modeling"
      },
      {
        id: "3.5-episode-eva",
        title: "Episode Collections and Extreme Value Analysis",
        description: "New Episode Collection database items for storing/viewing event start/end times with automatic generation from exceedance statistics, CSV import, or manual editing. New Extreme Value Analysis Custom Graph fits statistical distributions to peak values from simulation results and Episode Collections.",
        category: "Results"
      },
      {
        id: "3.5-cross-section-banks",
        title: "Cross Section Tool Water Level Display for Banks",
        description: "Enhanced cross section pick tool to display graph traces for water levels and ground levels on each side of river reach banks with color and visibility options.",
        category: "Visualization"
      },
      {
        id: "3.5-hecras-export",
        title: "HEC-RAS Network Export",
        description: "New ability to export network objects to HEC-RAS geometry files including river reaches, storage areas, and partial bridge export, complementing existing import functionality.",
        category: "Integration"
      },
      {
        id: "3.5-rtc-seconds",
        title: "RTC Time Controls in Seconds",
        description: "RTC Window Editor and RTC Grid Editor enhanced to allow time specification in hh:mm:ss format instead of previous hh:mm minute-precision format.",
        category: "Modeling"
      },
      {
        id: "3.5-network-results-enhancements",
        title: "Network Results Objects and 2D Linear Structures Integration",
        description: "Comprehensive integration enabling network results objects and 2D linear structures in graph reports, custom graphs, and statistical reports. Water quality results now available from 2D network results objects, with bridge opening association for 1D network results points.",
        category: "Results"
      },
      {
        id: "3.5-gauging-expansion",
        title: "Expanded Object Gauging",
        description: "Gauging capability extended beyond links to include nodes, subcatchments, network results objects, and 2D linear structures with results stored at more frequent gauge timestep.",
        category: "Results"
      },
      {
        id: "3.5-initial-state-time",
        title: "Run Scheduler Initial State Time Option",
        description: "New 'Start running from state time' option allowing simulations to start from initial state save time with automatic result merging from initial state and current simulations based on time relationships.",
        category: "Modeling"
      },
      {
        id: "3.5-engine-performance",
        title: "Engine Performance Enhancements",
        description: "Significant performance improvements including faster 1D hydraulic simulation code, reduced 2D network load times, and optimized GPU/CPU data exchange for 2D GPU simulations, particularly benefiting large networks.",
        category: "Performance"
      },
      {
        id: "3.5-gpu-improvements",
        title: "GPU Engine Expanded Support",
        description: "GPU engine now supports Network Results Objects and all 2D linear structures (Base, Sluice, and Bridge Linear Structures), previously only available on CPU engine.",
        category: "Performance"
      },
      {
        id: "3.5-print-layouts",
        title: "Print Layouts",
        description: "New flexible print layout system with Print Layout View for arranging frames of different content types (GeoPlan, Text, Image) on pages with saveable templates for customized printed output.",
        category: "Usability"
      },
      {
        id: "3.5-custom-actions",
        title: "Custom Actions",
        description: "New user and shared custom actions as shortcuts for regularly performed network tasks, emulating tree/workspace object drops or associating Ruby scripts, accessible via Actions Menu or Custom Actions Toolbars.",
        category: "Development"
      },
      {
        id: "3.5-sql-enhancements",
        title: "SQL Spatial Query Enhancements",
        description: "Spatial queries now possible between any two network layers or between network and background layers (not just GIS layers). SQL Dialog improvements include alphabetical field sorting and cursor-location field insertion with new 'spatial.' prefix replacing 'gislayer.' (backward compatible).",
        category: "Development"
      },
      {
        id: "3.5-gis-usability",
        title: "GeoPlan and GIS Usability Improvements",
        description: "Distance Tool snap mode, auto-label hiding for invisible objects, shapefile export with projection files, ArcGIS Server 10.1 REST interface support, grid filters saved in workspaces, validation property sheet display, and re-sizable dialogs (GeoPlan Find, Layer Theme Editor, GIS Layer Information).",
        category: "Usability"
      }
    ]
  },
  {
    id: "3.0",
    version: "3.0",
    releaseDate: "2012-08-01",
    features: [
      {
        id: "3.0-hecras-import",
        title: "HEC-RAS File Import",
        description: "New ability to import network objects from HEC-RAS geometry files including cross sections, interpolate sections, river reaches, storage areas, lateral structures, and partial bridge import.",
        category: "Data Management"
      },
      {
        id: "3.0-cross-section-window",
        title: "Cross Section Window",
        description: "New modeless Cross Section Window with toolbar button allowing real-time visualization of water level changes for river sections, banks, bridges, and inline banks during simulation replay without blocking software control.",
        category: "Visualization"
      },
      {
        id: "3.0-multiple-catchments",
        title: "Multiple ReFH/FEH Catchments",
        description: "ReFH and FEH design rainfall generators updated to support multiple catchments in single rainfall event with profile viewing and rain gauge boundary association for each catchment.",
        category: "Hydrology"
      },
      {
        id: "3.0-network-results",
        title: "Network Results Objects",
        description: "New network results point/line/polygon objects for interrogating 1D and 2D results with simulation engine-generated data providing more accurate results than previous Results Analysis Objects.",
        category: "Results"
      },
      {
        id: "3.0-resample-elevations",
        title: "Resample 2D Zone Elevations Without Re-meshing",
        description: "New functionality to recalculate ground levels of 2D mesh elements by sampling ground models without requiring complete zone re-meshing.",
        category: "Meshing"
      },
      {
        id: "3.0-mesh-zone-modifications",
        title: "Mesh Zone Ground Level Modifications at Meshing Time",
        description: "Ground level adjustments in mesh zones now performed during meshing instead of simulation time, allowing visualization in 3D Network Window and properties dialogs for both models and results.",
        category: "Meshing"
      },
      {
        id: "3.0-2d-structures",
        title: "Enhanced 2D Linear Structures",
        description: "New Blockage field for 2D linear weir structures to specify blocked proportions, plus new Sluice Linear Structure (2D) objects for defining sluice gates with dimensions, coefficients, and positioning.",
        category: "Modeling"
      },
      {
        id: "3.0-water-quality",
        title: "Advanced Water Quality Modeling",
        description: "Comprehensive water quality enhancements including algae (dissolved/attached), macrophytes, silicate, adsorbed phosphorus, solar radiation, and detrital pollutants modeling with performance improvements for dissolved oxygen calculations.",
        category: "Water Quality"
      },
      {
        id: "3.0-pollutograph-csv",
        title: "Pollutograph CSV Export/Import",
        description: "New ability to export/import pollutograph data to/from InfoWorks format CSV files for each determinant, enabling data exchange and pollutograph creation/updates.",
        category: "Data Management"
      },
      {
        id: "3.0-autocad-annotations",
        title: "AutoCAD Annotation and Distance Tools",
        description: "Import AutoCAD text annotations via general lines with custom autolabels for display, new Make Measured Length tool for geometry adjustment, arrow style property for line objects, and AutoCAD 2013 format support.",
        category: "Integration"
      },
      {
        id: "3.0-simulation-enhancements",
        title: "Simulation State and Control Enhancements",
        description: "Save simulation states at specified time/date (not just end state), optional rainfall smoothing control, and Message Log Window for tracking all popup messages since application start.",
        category: "Modeling"
      },
      {
        id: "3.0-gpu-improvements",
        title: "GPU Functionality Improvements",
        description: "Enhanced GPU support with improved feedback in simulation logs and progress window, GPU engine support for 2D infiltration, and detailed 2D timestep feedback including minimum timestep location and element ID.",
        category: "Performance"
      },
      {
        id: "3.0-2d-compression",
        title: "2D Zone Mesh Data Compression",
        description: "2D zone mesh data now compressed when stored in networks, significantly reducing storage space for large 2D zones and speeding up version control operations.",
        category: "Performance"
      },
      {
        id: "3.0-workflow-improvements",
        title: "Workflow and Usability Improvements",
        description: "Drag and drop model groups to networks, scenario/version selection when exporting networks, append to existing data option in Open Data Export Centre, and system theme fonts option.",
        category: "Usability"
      },
      {
        id: "3.0-sql-enhancements",
        title: "SQL Enhancements",
        description: "New GAMMALN function, date/time processing functions (NUMTOMONTHNAME, TODATE, TODATETIME), boolean support in prompt grids, and display precision control for SQL values in labels.",
        category: "Development"
      },
      {
        id: "3.0-long-section",
        title: "Long Section Enhancements",
        description: "Horizontal grid lines display option, new chainage type options (Specified/Geographical/Schematic), improved null elevation handling, enhanced flood section display with path visualization, and improved AutoCAD DWG export.",
        category: "Visualization"
      },
      {
        id: "3.0-graphing",
        title: "Comprehensive Graphing Enhancements",
        description: "Persistent page orientation, customizable time axis labels, Y-axis decimal precision control, axis scaling in defaults, interpolated values in tooltips, auto-label traces at simulation time, custom font/size for graph keys, and custom graph properties dialog.",
        category: "Visualization"
      },
      {
        id: "3.0-navigation",
        title: "Navigation and Display Improvements",
        description: "Show all in grid navigation option for connected/related objects, increased coordinate precision in status bar (up to 6 decimal places), improved graph printing with point/pixel unit selection.",
        category: "Usability"
      },
      {
        id: "3.0-database-compatibility",
        title: "Database Version Compatibility",
        description: "Ability to open version 2.0 and 2.5 databases read-only without updating, allowing objects to be copied to current master database while maintaining backward compatibility.",
        category: "Data Management"
      }
    ]
  },
  {
    id: "2.5",
    version: "2.5",
    releaseDate: "2012-02-01",
    features: [
      {
        id: "2.5-polygon-tools",
        title: "Enhanced Polygon and Polyline Tools",
        description: "Polygon cropping tool extended to include polylines, allowing all polygon and polyline objects to be cropped against each other. New Close Gaps and Overlaps tool for cleaning up polygons/polylines prior to 2D meshing.",
        category: "Modeling"
      },
      {
        id: "2.5-linear-structures",
        title: "2D Linear Structure Objects",
        description: "New Linear Structure (2D) object for representing wall and weir structures in 2D simulations, superseding the Porous Wall object (retained for backwards compatibility).",
        category: "Modeling"
      },
      {
        id: "2.5-general-point",
        title: "General Point Object",
        description: "New General Point object for storing surveyed point data to provide elevation data when creating TIN ground models.",
        category: "Data Management"
      },
      {
        id: "2.5-inlet-types",
        title: "New Inlet Types",
        description: "New UPC Grate inlet type (from Universitat Politècnica de Catalunya) as alternative to HEC-22 continuous grate, plus new Inlet 2D flood type allowing head discharge relationships between manholes and 2D mesh.",
        category: "Modeling"
      },
      {
        id: "2.5-grid-organization",
        title: "Network Object Grid Window Reorganization",
        description: "Grid windows reorganized by geometry types with new Lines and Points grids added, 2D grid removed with objects moved to Polygons/Lines/Points grids, River Lines grid consolidated into Lines grid.",
        category: "Usability"
      },
      {
        id: "2.5-rs-import",
        title: "Enhanced RS CSV Importer",
        description: "Expanded InfoWorks RS CSV import to include subcatchments, conduits (circular/rectangular/sprung arch), weirs, culvert inlets/outlets, open orifices, floodplain sections, and vertical sluices.",
        category: "Data Management"
      },
      {
        id: "2.5-agent-meshing",
        title: "Improved Simulation Agent Meshing",
        description: "Agent mesher enhanced to support GIS files and layers in meshing process, completely replacing old 'online' method that blocked UI during meshing. Includes more accurate ground level interpolation with sampling within triangles.",
        category: "Meshing"
      },
      {
        id: "2.5-terrain-sensitive",
        title: "Terrain-Sensitive Meshing",
        description: "New terrain-sensitive meshing option for 2D zones to increase mesh resolution in areas with large height variation while maintaining lower resolution in flat areas using iterative triangle splitting based on maximum height variation.",
        category: "Meshing"
      },
      {
        id: "2.5-2d-performance",
        title: "2D Engine Performance Enhancements",
        description: "Major performance improvements including spatial sorting of mesh triangles during meshing for memory clustering, aggregation of virtual element faces to reduce operations per timestep, and optimized bank connection activation.",
        category: "Performance"
      },
      {
        id: "2.5-custom-labels",
        title: "River Section and 2D Element Results in Custom Labels",
        description: "Custom labeling now supports river reach sections/banks and 2D zone mesh elements with sub-object results fields available in Custom Label Settings.",
        category: "Results"
      },
      {
        id: "2.5-ui-tools",
        title: "UI and Usability Enhancements",
        description: "New Move Selection tool for dragging objects on GeoPlan, adjustable field name width in Object Properties Window, scale bar display toggle option, and improved recycle bin with deletion date and user information.",
        category: "Usability"
      },
      {
        id: "2.5-version-control",
        title: "Version Control Branch Deletion",
        description: "Ability to delete branches of version controlled items (networks, etc.) by sending them to Recycle Bin via Explorer Window context menu.",
        category: "Version Control"
      },
      {
        id: "2.5-standalone-2d",
        title: "Standalone 2D Simulations",
        description: "2D simulations can now run without requiring a 1D network to be present, enabling pure 2D-only modeling.",
        category: "Modeling"
      },
      {
        id: "2.5-simulation-params",
        title: "Enhanced Simulation Parameters",
        description: "New 'Use 2D elevations instead of depths' parameter to handle ground level discrepancies between manholes and 2D mesh, preventing oscillating flows. Option to use initial states regardless of boundary condition matching.",
        category: "Modeling"
      },
      {
        id: "2.5-water-quality-init",
        title: "Water Quality Initialization Changes",
        description: "Number of initial state steps default changed from 3 to -1 (no initialization) as use of values > 0 is deprecated. Runoff-only simulation states can no longer be saved or used as initial states.",
        category: "Water Quality"
      },
      {
        id: "2.5-gauge-changes",
        title: "Automatic Gauging Changes",
        description: "Links connected to outfalls no longer automatically gauged to prevent unnecessary result data generation. Gauge results only generated for links in Additional Links to be Gauged selection list.",
        category: "Results"
      },
      {
        id: "2.5-log-enhancements",
        title: "Simulation Log File Enhancements",
        description: "Improved logging with unconverged object counts in timestep logs, better composite object reporting with meaningful suffixes, conditional 2D volume balance linkage errors, and enhanced 2D network loading feedback.",
        category: "Performance"
      },
      {
        id: "2.5-local-steady-state",
        title: "Local Steady State Detection",
        description: "2D engine now checks for local steady state in individual mesh elements rather than global zone-wide state, significantly improving simulation speed for large zones with independent flooded areas.",
        category: "Performance"
      },
      {
        id: "2.5-engine-improvements",
        title: "Simulation Engine Improvements",
        description: "New weir-based model for flood type 'Lost' improving stability and accuracy, improved conveyance calculations for Colebrook-White roughness removing pipe slope assumptions, and double precision for 2D level/depth initial conditions.",
        category: "Performance"
      },
      {
        id: "2.5-gis-enhancements",
        title: "GIS and Mapping Enhancements",
        description: "Web Map Service (WMS) images supported in MapXtreme GeoPlans, geographic coordinate transformations for ArcObjects/ArcEngine, feature dataset support in ArcObjects, and US survey feet option for gridded ground models.",
        category: "Integration"
      },
      {
        id: "2.5-autofilter",
        title: "Autofilter in Grid Windows",
        description: "Network object grid windows now support autofiltering with up to two simultaneous filters, allowing selective data display using comparison operators and values via new Filter Options dialog.",
        category: "Usability"
      }
    ]
  },
  {
    id: "2.0",
    version: "2.0",
    releaseDate: "2011-08-01",
    features: [
      {
        id: "2.0-placeholder",
        title: "Version 2.0 Features",
        description: "Features for version 2.0 - August 2011. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "1.5",
    version: "1.5",
    releaseDate: "2011-02-01",
    features: [
      {
        id: "1.5-3d-display",
        title: "3D Network Window Display Improvements",
        description: "Enhanced 3D visualization with improved bridge opening display (holes cut into bridge faces) and 2D mesh elements now drawn as horizontal elements with risers for accurate representation.",
        category: "Visualization"
      },
      {
        id: "1.5-skew-bridges",
        title: "Skew Bridges",
        description: "New fields added for modeling skew bridges including Skew angle field for bridge deck angle specification and Skew openings and piers field for opening orientation.",
        category: "Modeling"
      },
      {
        id: "1.5-2d-infiltration",
        title: "2D Infiltration Model",
        description: "New 2D infiltration model allowing soil infiltration modeling in previously impervious 2D zones using Infiltration Surface objects with constant, fixed, or Horton infiltration models.",
        category: "Hydrology"
      },
      {
        id: "1.5-water-quality",
        title: "Enhanced Water Quality Modeling",
        description: "Water quality modeling now available in 2D networks with advection and diffusion of pollutants from river banks, manholes, point sources, and external boundaries. Water Quality Model also updated to support non-prismatic conduits including river reaches and bridges.",
        category: "Water Quality"
      },
      {
        id: "1.5-isis-import",
        title: "ISIS .dat File Import",
        description: "Limited support added for importing network data from ISIS .dat files including river section data and spill data with geo-referencing.",
        category: "Data Management"
      },
      {
        id: "1.5-river-reach-tools",
        title: "River Reach Building Improvements",
        description: "Major enhancements including renamed objects (Cross Section Lines, Bank Lines), editable/uneditable river data options, automatic roughness updates, cross section line generation, and join reaches tool.",
        category: "Modeling"
      },
      {
        id: "1.5-interpolation",
        title: "Enhanced Interpolation Tool",
        description: "Improved section interpolation with support for multiple sections and custom chords to map specific features between sections for better accuracy.",
        category: "Modeling"
      },
      {
        id: "1.5-section-highlighting",
        title: "Section Highlighting on GeoPlan",
        description: "River and bridge sections now temporarily highlighted on GeoPlan when opening section editors, improving usability for object identification.",
        category: "Usability"
      },
      {
        id: "1.5-polygon-tools",
        title: "Enhanced Polygon Tools",
        description: "Ability to change line/polygon types, improved crop overlapping polygons functionality supporting river reaches, bridges, storage areas, and complex polygons.",
        category: "Modeling"
      },
      {
        id: "1.5-mesh-diagnostics",
        title: "2D Mesh Diagnostics and Improvements",
        description: "New read-only Mesh summary field storing meshing information and validation warnings. Better handling of undefined elevation areas with error reporting, and element adjustment at river banks now performed during meshing instead of simulation time.",
        category: "Meshing"
      },
      {
        id: "1.5-mesh-manholes",
        title: "Improved Meshing at Manholes",
        description: "Mesh triangles now aggregated at 2D manholes with new 2D element area factor field to reduce water balance problems and improve stability.",
        category: "Meshing"
      },
      {
        id: "1.5-ground-model-display",
        title: "Ground Model Display in Section Editors",
        description: "Ground Model trace can now be displayed on all property sheet section editors when ground model is loaded onto GeoPlan.",
        category: "Visualization"
      },
      {
        id: "1.5-sql-enhancements",
        title: "SQL Enhancements",
        description: "Major SQL improvements including ORDER BY clause, DISTINCT keyword, INSERT clause, new date/trigonometric functions, object ID field support, and flags as arrays.",
        category: "Development"
      },
      {
        id: "1.5-explorer-improvements",
        title: "Explorer Window Enhancements",
        description: "Multiple improvements including version control in Find pane, ID column display, enhanced Model Group icons, and image-enhanced object creation menu.",
        category: "Usability"
      },
      {
        id: "1.5-theme-management",
        title: "Improved Theme Management",
        description: "Layer Theme Editor enhanced to allow quick addition/removal of multiple theme ranges by holding down buttons.",
        category: "Usability"
      },
      {
        id: "1.5-area-measurement",
        title: "Area Measurement Tool",
        description: "Distance Estimation Tool enhanced to measure area in addition to length using polygon formation with CTRL+double-click.",
        category: "Tools"
      },
      {
        id: "1.5-data-flags",
        title: "Enhanced Data Flag System",
        description: "Data flag codes increased from two to four characters, plus new Find and Replace Flags functionality for updating imported network flagging systems.",
        category: "Data Management"
      },
      {
        id: "1.5-selection-tools",
        title: "Selection Tool Improvements",
        description: "Double-click now displays property sheets for multiple overlapping objects, works in Long Section and 3D windows, plus Backspace shortcut to clear selections.",
        category: "Usability"
      },
      {
        id: "1.5-version-control",
        title: "Version Control Enhancements",
        description: "Optional filters in Comparison dialog (Ignore flags, Ignore defaults, Use display precision) and ability to copy commit history to clipboard.",
        category: "Version Control"
      },
      {
        id: "1.5-geoplan-improvements",
        title: "GeoPlan Enhancements",
        description: "Customizable GIS layer selection color, improved network object deletion controls with security options, and improved GeoPlan properties/themes saving.",
        category: "Usability"
      },
      {
        id: "1.5-access-import",
        title: "Enhanced Access Database Import",
        description: "Queries now available for selection in Feature dropdown list of Open Data Import Centre dialog alongside tables.",
        category: "Data Management"
      },
      {
        id: "1.5-gridded-ground-model",
        title: "Gridded Ground Model Import",
        description: "Support for importing gridded ground models from InfoWorks format .IGM files.",
        category: "Data Management"
      },
      {
        id: "1.5-user-permissions",
        title: "Emergency Reset of User Permissions",
        description: "Ability to reset user permissions for a master database and add users as administrators via emergency reset file from Innovyze.",
        category: "Administration"
      },
      {
        id: "1.5-google-earth",
        title: "Google Earth Export Enhancement",
        description: "New option to export only the currently displayed timestep when exporting to Google Earth KMZ format.",
        category: "Integration"
      }
    ]
  }
];
